import React, { useEffect, useState } from 'react';
import Date from './Date/Date';
import Actions from './Actions/Actions'
import classes from './ListItem.module.scss'

const ListItem = props => {
	const [remaining, setRemaining] = useState(remainingTime(props.task.due_datetime))
	const obj = {
		interval: null,
	}
	obj.setRemaining = setRemaining
	
	useEffect(() => {
		if(obj.interval === null){
			obj.interval = setInterval(() => {
				setRemaining(remainingTime(props.task.due_datetime))
				// console.log(remaining)
			}, 1000)
		}
		return () => {
			if(obj.interval !== null) clearInterval(obj.interval)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<li className={classes.ListItem}>
			<Date date={props.task.due_datetime} isHighPriority={props.task.is_high_priority}/>
			<div className={classes.DataCon}>
				<h2 className={classes.Title}>{props.task.title}</h2>
				<p className={classes.Description}>{props.task.description}</p>
				<p className={classes.AddedDate}>
					{ !remaining.expired ? (
						<span className={remaining.seconds < 10 * 60 ? classes.RedColor : null}>
							Remaining: {remaining.dueTime}
						</span>
					) : (
						"Time over"
					) }
					<span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</span>
					<span>Added on: {addedOnTime(props.task.due_datetime)}</span>
				</p>
			</div>
			<Actions />
		</li>
	)
}

const remainingTime = date => {
	const obj = {
		seconds: 0,
		dueTime: 'Expired',
		expired: false
	}
	
	const n = new window.Date()
	const s = new window.Date(date)
	let now = Math.floor(n.getTime() / 1000)
	let sec = Math.floor(s.getTime() / 1000)
	sec = sec - now
	obj.seconds = sec

	let x = null

	if(sec < 0){
		obj.expired = true
	}
	else{
		x = 365 * 24 * 60 * 60

		if(sec > x * 2 ){
			obj.dueTime = Math.floor( sec/x ) + ' years'
		}
		else if(sec > x ){
			obj.dueTime = Math.floor( sec/x ) + ' years '
			obj.dueTime += Math.floor(Math.floor( sec%x ) / (x/12)) + ' months'
		}
		else{
			x = 30 * 24 * 60 * 60
			if(sec > x * 3 ){
				obj.dueTime = Math.floor( sec/x ) + ' months'
			}
			else if(sec > x ){
				obj.dueTime = Math.floor( sec/x ) + ' months '
				obj.dueTime += Math.floor(Math.floor( sec%x ) / (x/30)) + ' days'
			}
			else{
				x = 24 * 60 * 60
				if(sec > x * 3 ){
					obj.dueTime = Math.floor( sec/x ) + ' days'
				}
				else if(sec > x ){
					obj.dueTime = Math.floor( sec/x ) + ' days '
					obj.dueTime += Math.floor(Math.floor( sec%x ) / (x/24)) + ' hours'
				}
				else{
					x = 60 * 60
					if(sec > x ){
						obj.dueTime = Math.floor( sec/x ) + ' hours '
						obj.dueTime += Math.floor(Math.floor( sec%x ) / (x/60)) + ' minutes'
					}
					else{
						x = 60
						if(sec > x ){
							obj.dueTime = Math.floor( sec/x ) + ' minutes '
							obj.dueTime += Math.floor(Math.floor( sec%x ) / (x/60)) + ' seconds'
						}
						else{
							obj.dueTime = sec + ' seconds'
						}
					}
				}
			}
		}
	}
	return obj
}
const addedOnTime = date => {
	const d = new window.Date(date)
	let x = d.toString().split(' ')
	const addedOnDate = x[1] + ' ' + x[2] + ', ' + x[3]
	const addedOnTime = d.toLocaleTimeString()
	return addedOnDate + ' at ' + addedOnTime
}

export default ListItem