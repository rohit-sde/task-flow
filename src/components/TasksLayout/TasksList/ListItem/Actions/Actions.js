import React, { useRef } from 'react'
import classes from './Actions.module.scss'
import { IconContext } from 'react-icons'
import { IoMdDoneAll } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { connect } from 'react-redux'
import * as actions from './../../../../../store/actions/index'
import DialogAlert from './../../../../UI/DialogAlert/DialogAlert'
import { useHistory } from 'react-router'
import { axiosAuth } from '../../../../../axios'

const Actions = props => {

	const editRef = useRef(null)
	const deleteRef = useRef(null)
	const doneRef = useRef(null)
	const history = useHistory()
	console.log(props.task)
	const obj = {
		task: props.task,
		editRef,
		deleteRef,
		doneRef,
		updateBackdrop: props.updateBackdrop,
		history,
		refreshTasksLayout: props.refreshTasksLayout,
		isExpired: isExpiredFun(props.task)
	}

	return (
		<div className={classes.Actions}>
			{ !obj.isExpired ? (
				<div
					className={classes.Done + (props.task.is_completed ? ' ' + classes.NoPointer : '') }
					data-taskdone={props.task.is_completed? '1' : '0'}
					ref={doneRef}
					onClick={!props.task.is_completed ? doneHandler.bind(null, obj) : null}>
						<IconContext.Provider value={{size: '1.5em' }}>
							<IoMdDoneAll tabIndex={!props.task.is_completed ? 0 : null}/>
						</IconContext.Provider>
				</div>
			) : (<div className={classes.Done}/>)}
			
			
			<div className={classes.EditDelete}>
				{ !props.task.is_completed && !obj.isExpired && (
					<div className={classes.Edit} ref={editRef}>
						<IconContext.Provider value={{size: '1.5em' }}>
							<BiEdit tabIndex="0"/>
						</IconContext.Provider>
					</div>
				)}
				<div className={classes.Delete} ref={deleteRef} onClick={deleteHandler.bind(null, obj)}>
					<IconContext.Provider value={{size: '1.5em' }}>
						<MdDeleteOutline tabIndex="0"/>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	)
}

const deleteHandler = (obj, e) => {
	const cbSuccessFun = (updateBackdrop, e) => {
		console.log(obj)
		axiosAuth(axios => {
			axios.delete('tasks/' + task._id)
			.then(res => {
				if(res.data.status){
					obj.refreshTasksLayout()
					updateBackdrop({
						show: false,
						data: null
					})
				}
				else{
					console.log(res.data)
				}
			})
			.catch(e => {
				console.log(e)
			})
		})
	}
	
	const {updateBackdrop, task} = obj
	// console.log(obj)
	// console.log(task)

	updateBackdrop({
		show: true,
		data: <DialogAlert cbSuccess={cbSuccessFun}/>
	})
}
const doneHandler = (obj, e) => {
	const cbSuccessFun = (updateBackdrop, e) => {
		// console.log(obj)

		const data = {
			"isCompleted": true
		}
		axiosAuth(axios => {
			axios.patch('tasks/' + task._id, data)
			.then(res => {
				console.log(res)
				if(res.data.status){
					obj.refreshTasksLayout()
					updateBackdrop({
						show: false,
						data: null
					})
				}
				else{
					console.log(res.data)
				}
			})
			.catch(e => {
				console.log(e)
			})
		})
	}
	
	const {updateBackdrop, task} = obj
	console.log(obj)
	console.log(task)

	updateBackdrop({
		show: true,
		data: <DialogAlert cbSuccess={cbSuccessFun}/>
	})
}
const isExpiredFun = task => {
	const due = (new window.Date(task.due_datetime)).getTime()
	const now = (new window.Date()).getTime()

	return (now - due > 0) ? true : false
}

const mapDispatchToProps = dispatch => {
	return {
		updateBackdrop: (...args) => dispatch( actions.updateBackdrop(...args) )
	}
}

export default connect(null, mapDispatchToProps)(Actions)