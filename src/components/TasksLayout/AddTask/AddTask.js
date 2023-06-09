import React, { useState } from 'react'
import Textarea from '../../UI/Textarea/Textarea'
import classes from './AddTask.module.scss'
import Button from './../../UI/Button/Button'
import AlertMessage from '../../UI/AlertMessage/AlertMessage'
import { axiosAuth } from '../../../axios'

const AddTask = props => {
	const stateObj = {}
	const messageHST = useState({error: 1, show: 0, text: ''})
	stateObj.messageHST = messageHST
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
					stateObj={stateObj} label="Tasks"
					textarea={{
						placeholder: "Enter brief title",
						autoFocus: true
					}}/>
				<Textarea
					value=""
					name="description"
					stateObj={stateObj}
					minRows={4}
					label="Description"
					textarea={{
						placeholder: "Enter more info about task"
					}}/>
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
		return
	}

	// axiosAuth
}

export default AddTask