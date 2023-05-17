import React from 'react'
import Navigation from './Navigation/Navigation'
import classes from './TasksLayout.module.scss'
import TasksList from './TasksList/TasksList'

const TasksLayout = props => {

	const tasks = [
		{_id: "7654756785673", title: "Title 1", description: "Description 1"},
		{_id: "7654756785244", title: "Title 2", description: "Description 2"},
		{_id: "7654756785647", title: "Title 3", description: "Description 3"},
		{_id: "7654756785678", title: "Title 4", description: "Description 4"}
	]

	return (
		<div className={classes.TasksLayout}>
			<Navigation></Navigation>
			<div className={classes.TasksList}>
				<TasksList tasks={tasks} />
			</div>
		</div>
	)
}

export default TasksLayout