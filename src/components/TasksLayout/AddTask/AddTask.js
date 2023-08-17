import React, { useState } from 'react'
import Textarea from '../../UI/Textarea/Textarea'
import classes from './AddTask.module.scss'
import Button from './../../UI/Button/Button'
import AlertMessage from '../../UI/AlertMessage/AlertMessage'
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker'
import { axiosAuth } from '../../../axios'
import Radiogroup from '../../UI/RadioGroup/RadioGroup'
import { useHistory } from 'react-router'
import * as taskUtils from './../taskUtils'
import * as actions from './../../../store/actions/index'
import { connect } from 'react-redux'

const AddTask = props => {
	const stateObj = {}
	const messageHST = useState({error: 1, show: 0, text: ''})
	stateObj.messageHST = messageHST
	stateObj.history = useHistory()
	stateObj.updateWaitLoader = props.updateWaitLoader
	const [message] = messageHST

	return (
		<div className={classes.AddTask}>
			<h2>Add new Task</h2>
			<div className={classes.Error}>
				{ message.show ? (
					<AlertMessage error={message.error}>{message.text}</AlertMessage>
				) : (
					null
				) }
			</div>
			<form>
				<Textarea
					value=""
					name="title"
					stateObj={stateObj}
					label="Tasks"
					textarea={{
						placeholder: "Enter brief title",
						autoFocus: true,
						required: true
					}}/>
				<Textarea
					value=""
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
							value="0"
							/>
					</div>
				</div>
				<div className={classes.ButtonCon}>
					<Button id="addNewTask" onClick={addNewTaskHandler.bind(null, stateObj)}>Add task</Button>
				</div>
			</form>
		</div>
	)
}

const addNewTaskHandler = (stateObj, e) => {
	e.preventDefault()
	// console.log(stateObj)
	const setMessage = stateObj.messageHST[1]
	const {updateWaitLoader} = stateObj

	let title = stateObj.title.value
	let description = stateObj.description.value
	title = taskUtils.trimStart(taskUtils.trimEnd(title))
	description = taskUtils.trimStart(taskUtils.trimEnd(description))

	if(title === ''){
		setMessage({show: 1, error: 1, text: 'Title is Required.'})
		stateObj.title.more.ref.current.focus()
		return
	}

	title = taskUtils.addBRTag(title)
	description = taskUtils.addBRTag(description)

	const p = stateObj.priority.value;
	const isHighPriority = (p === '1' || p === 1 || p === true) ? true : false
	
	const data = {
		title: title,
		description: description,
		dueDatetime: stateObj.dueDate.value,
		isHighPriority,
	}
	// console.log(data)	

	updateWaitLoader({
		show: true,
		message: 'Adding new task.'
	})
	axiosAuth(axios => {
		axios.post('tasks', data)
			.then(res => {
				updateWaitLoader({})
				// console.log(res)
				if(res.data.status){
					stateObj.history.push('/tasks/recent/page/1')
				}
				else{
					// console.log(res.data)
				}
			})
			.catch(e => {
				updateWaitLoader({})
				// console.log(e)
			})
	})
}

const mapDispatchToProps = dispatch => {
	return {
		updateWaitLoader: (...args) => { dispatch( actions.updateWaitLoader(...args) ) }
	}
}
export default connect(null, mapDispatchToProps)(AddTask)