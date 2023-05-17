import React from 'react';
import classes from './ListItem.module.scss'

const ListItem = props => {
	return (
		<li className={classes.ListItem}>
			<h2 className={classes.Title}>{props.task.title}</h2>
			<p className={classes.Description}>{props.task.description}</p>
		</li>
	)
}

export default ListItem