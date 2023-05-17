import React from 'react';
import ListItem from './ListItem/ListItem'
import classes from './TasksList.module.scss'

const TasksList = props => {
	return (
		<div className={classes.TasksList}>
			<ul>
				{
					props.tasks.map(task => (
						<ListItem task={task} key={task._id} />
					) )
				}
			</ul>
		</div>
	)
}

export default TasksList