import React, { useState } from 'react'
import Textarea from '../../UI/Textarea/Textarea'
import classes from './EditTask.module.scss'
import Button from './../../UI/Button/Button'
import AlertMessage from '../../UI/AlertMessage/AlertMessage'
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker'
import { axiosAuth } from '../../../axios'
import Radiogroup from '../../UI/RadioGroup/RadioGroup'
import { useHistory } from 'react-router'
import * as taskUtils from './../taskUtils'
import * as actions from './../../../store/actions/index'
import { connect } from 'react-redux'

const EditTask = props => {
	const stateObj = {}
	const messageHST = useState({error: 1, show: 0, text: ''})
	stateObj.messageHST = messageHST
	stateObj.history = useHistory()
	stateObj.EditTaskProps = props
	stateObj.updateWaitLoader = props.updateWaitLoader
	const [message] = messageHST
	// console.log(props)

	return (
		<div className={classes.EditTask}>
			<h2>Edit Task</h2>
			<div className={classes.Error}>
				{ message.show ? (
					<AlertMessage error={message.error}>{message.text}</AlertMessage>
				) : (
					null
				) }
			</div>
			<form>
				<Textarea
					value={taskUtils.removeBRTag(props.editTaskState.task.title)}
					name="title"
					stateObj={stateObj}
					label="Task"
					textarea={{
						placeholder: "Enter brief title",
						autoFocus: true,
						required: true
					}}/>
				<Textarea
					value={taskUtils.removeBRTag(props.editTaskState.task.description)}
					name="description"
					stateObj={stateObj}
					label="Description"
					minRows={4}
					textarea={{
						placeholder: "Enter more info about task"
					}}/>
				<div className={classes.InputCon}>
					<div>
						<DateTimePicker
							value={props.editTaskState.task.due_datetime}
							name="due_datetime"
							stateObj={stateObj}
							label="Due date"/>
					</div>
					<div>
						<Radiogroup
							stateObj={stateObj}
							label="Priority"
							data={[
								{label: 'High', name: 'priority', value: '1'},
								{label: 'Normal', name: 'priority', value: '0'}
							]}
							value={props.editTaskState.task.is_high_priority ? '1' : '0'}
							/>
					</div>
				</div>
				<div className={classes.ButtonCon}>
					<Button id="updateTask" onClick={updateTaskTaskHandler.bind(null, stateObj)}>Update Task</Button>
				</div>
			</form>
		</div>
	)
}

const updateTaskTaskHandler = (stateObj, e) => {
	e.preventDefault()
	// console.log(stateObj)
	// console.log('------------------------------------')
	const setMessage = stateObj.messageHST[1]


	let title = stateObj.title.value
	let description = stateObj.description.value
	title = taskUtils.trimStart(taskUtils.trimEnd(title))
	description = taskUtils.trimStart(taskUtils.trimEnd(description))

	if(title === ''){
		setMessage({show: 1, error: 1, text: 'Title is Required.'})
		stateObj.title.more.ref.current.focus()
		return
	}

	const p = stateObj.priority.value;
	const isHighPriority = (p === '1' || p === 1 || p === true) ? true : false
	
	const data = {}
	if(title !== taskUtils.removeBRTag( stateObj.EditTaskProps.editTaskState.task.title) ){
		data.title = taskUtils.addBRTag(title)
	}
	if(description !== taskUtils.removeBRTag( stateObj.EditTaskProps.editTaskState.task.description) ){
		data.description = taskUtils.addBRTag(description)
	}
	if(isHighPriority !== stateObj.EditTaskProps.editTaskState.task.is_high_priority) data.isHighPriority = isHighPriority

	let preDD = Math.floor( (new Date(stateObj.EditTaskProps.editTaskState.task.due_datetime) ).getTime() / 1000 )
	let newDD = Math.floor( (new Date(stateObj.dueDate.value) ).getTime() / 1000 )
	// console.log(preDD)
	// console.log(newDD)

	if(preDD !== newDD) data.dueDatetime = stateObj.dueDate.value
	
	// console.log(data)
	
	const id = stateObj.EditTaskProps.editTaskState.task._id

	if(Object.keys(data).length > 0){
		const {updateWaitLoader} = stateObj
		updateWaitLoader({
			show: true,
			message: 'Updating task.'
		})
		axiosAuth(axios => {
			axios.patch(`tasks/${id}`, data)
				.then(res => {
					// console.log(res)
					updateWaitLoader({})
					if(res.data.status){
						stateObj.history.push(stateObj.EditTaskProps.editTaskState.url)
					}
					else{
						// console.log(res.data)
						stateObj.history.push(stateObj.EditTaskProps.editTaskState.url)
					}
				})
				.catch(e => {
					// console.log(e)
					updateWaitLoader({})
				})
		})
	}
	else{
		stateObj.history.push(stateObj.EditTaskProps.editTaskState.url)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateWaitLoader: (...args) => { dispatch( actions.updateWaitLoader(...args) ) }
	}
}
export default connect(null, mapDispatchToProps)(EditTask)