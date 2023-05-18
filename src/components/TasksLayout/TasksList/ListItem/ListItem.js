import React from 'react';
import Date from './Date/Date';
import Actions from './Actions/Actions'
import classes from './ListItem.module.scss'

const ListItem = props => {
	return (
		<li className={classes.ListItem}>
			<Date date="2021-10-26T09:56:04.871Z" />
			<div className={classes.DataCon}>
				<h2 className={classes.Title}>{props.task.title}</h2>
				<p className={classes.Description}>{props.task.description}</p>
				<p className={classes.AddedDate}>Added on: {props.task.created_at}</p>
			</div>
			<Actions />
		</li>
	)
}

export default ListItem