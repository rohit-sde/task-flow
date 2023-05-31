import React from 'react'
import classes from './CircularLoader.module.scss'

const CircularLoader = props => {
	console.log('[CircularLoader]')
	return (
		<div className={classes.CircularLoader}>
			<div className={classes.LoaderDiv}>
				<div className={classes.Loader} />
			</div>
			<h2>Loading...</h2>
		</div>
	)
}

export default CircularLoader