import React from 'react';
import classes from './AlertMessage.module.scss'

const AlertMessage = props => {
	let cls = [classes.AlertMessage]
	cls.push( props.error ? classes.Error : classes.Success )
	return (
		<p className={cls.join(' ')}>
			{props.children !== undefined && props.children !== '' ?
				props.children :
				<br/>}
		</p>
	)
}

export default AlertMessage;