import React from 'react'
import Navigation from './Navigation/Navigation'
import classes from './TasksLayout.module.scss'

const TasksLayout = props => {
	return (
		<div className={classes.TasksLayout}>
			<Navigation></Navigation>
			<div className={classes.TasksList}>
				Hello
			</div>
		</div>
	)
}

export default TasksLayout