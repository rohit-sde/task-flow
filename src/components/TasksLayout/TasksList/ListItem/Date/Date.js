import React from 'react';
import classes from './Date.module.scss'
import { IconContext } from 'react-icons'
import { HiFlag } from 'react-icons/hi'

const Date = props => {
	let date = window.Date(props.date).split(' ')
	// date = Date(date + '')
	// console.log(date)
	// console.log( date )
	// const event = new Date('August 19, 1975 23:15:30');
	// console.log(event.toString());
	
	return (
		<div className={classes.Date}>
			<div className={classes.Flag} data-high-priority="1">
				<IconContext.Provider value={{size: '1.5em' }}>
					<HiFlag/>
				</IconContext.Provider>
			</div>
			<div className={classes.Icon}>
				<div className={classes.Day}>
					{date[0]}
				</div>
				<div className={classes.MainDateCon}>
					<div className={classes.DateNum}>{date[2]}</div>
					<div className={classes.MainDateConSub}>
						<div className={classes.Month}>{date[1]}</div>
						<div className={classes.Year}>{date[3]}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Date