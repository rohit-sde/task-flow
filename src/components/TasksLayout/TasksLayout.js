import React from 'react'
import Navigation from './Navigation/Navigation'
import classes from './TasksLayout.module.scss'
import TasksList from './TasksList/TasksList'
import {Switch, Route} from 'react-router-dom'
import AddTask from './AddTask/AddTask'

const TasksLayout = props => {
	console.log('props')
	console.log(props)

	return (
		<div className={classes.TasksLayout}>
			<Navigation/>
			<Switch>
				<Route path="/addTask">
					<AddTask />
				</Route>
				<Route path="/">
					<TasksList />
				</Route>
			</Switch>
		</div>
	)
}

export default TasksLayout