import React, { useState } from 'react'
import Textarea from '../../UI/Textarea/Textarea'
import classes from './AddTask.module.scss'
import Button from './../../UI/Button/Button'
import AlertMessage from '../../UI/AlertMessage/AlertMessage'
import DateTimePicker from '../../UI/DateTimePicker/DateTimePicker'
import { axiosAuth } from '../../../axios'
import Radiogroup from '../../UI/RadioGroup/RadioGroup'
import { useHistory } from 'react-router'

const AddTask = props => {
	const stateObj = {}
	const messageHST = useState({error: 1, show: 0, text: ''})
	stateObj.messageHST = messageHST
	stateObj.history = useHistory()
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


	let title = stateObj.title.value
	let description = stateObj.description.value
	const patternS = /^([(\\n|\\r\\n|\\r)\s]+)/g
	const patternE = /([(\\n|\\r\\n|\\r)\s]+)$/g

	title = title.replaceAll(patternS, '')
	title = title.replaceAll(patternE, '')
	title = title.replace(/\r\n|\r|\n/g,"<br/>")
	description = description.replace(patternS, '')
	description = description.replace(patternE, '')
	description = description.replace(/\r\n|\r|\n/g,"<br/>")

	if(title === ''){
		setMessage({show: 1, error: 1, text: 'Title is Required.'})
		stateObj.title.more.ref.current.focus()
		return
	}

	const p = stateObj.priority.value;
	const isHighPriority = (p === '1' || p === 1 || p === true) ? true : false
	const data = {
		title: stateObj.title.value,
		description: stateObj.description.value,
		dueDatetime: stateObj.dueDate.value,
		isHighPriority,
	}
	// console.log(data)
	// console.log(stateObj)
	axiosAuth(axios => {
		axios.post('tasks', data)
			.then(res => {
				// console.log(res)
				if(res.data.status){
					stateObj.history.push('/')
				}
				else{
					console.log(res.data)
				}
			})
			.catch(e => {
				// console.log(e)
			})
	})
}

export default AddTask