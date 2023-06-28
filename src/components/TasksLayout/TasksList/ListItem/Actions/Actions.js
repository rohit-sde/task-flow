import React, { useRef } from 'react'
import classes from './Actions.module.scss'
import {IconContext} from 'react-icons'
import { IoMdDoneAll } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { connect } from 'react-redux'
import * as actions from './../../../../../store/actions/index'

const Actions = props => {

	const editRef = useRef(null)
	const deleteRef = useRef(null)
	const doneRef = useRef(null)

	const obj = {
		task: props.task,
		editRef,
		deleteRef,
		doneRef,
		updateBackdrop: props.updateBackdrop
	}

	return (
		<div className={classes.Actions}>
			<div className={classes.Done} data-taskdone={props.task.is_completed? '1' : '0'} ref={doneRef}  onClick={doneHandler.bind(null, obj)}>
				<IconContext.Provider value={{size: '1.5em' }}>
					<IoMdDoneAll tabIndex="0"/>
				</IconContext.Provider>
			</div>
			<div className={classes.EditDelete}>
				{ !props.task.is_completed && (
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
	const {updateBackdrop, task} = obj
	console.log(obj)
	console.log(task)
	
	updateBackdrop({
		show: true,
		data: 'Hello'
	})
}
const doneHandler = (obj, e) => {
	const {updateBackdrop, task} = obj
	
}

const mapDispatchToProps = dispatch => {
	return {
		updateBackdrop: (...args) => dispatch( actions.updateBackdrop(...args) ),
	}
}

export default connect(null, mapDispatchToProps)(Actions)