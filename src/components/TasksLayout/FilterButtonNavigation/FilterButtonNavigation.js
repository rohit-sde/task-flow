import React from 'react';
import classes from './FilterButtonNavigation.module.scss'
import {Link} from 'react-router-dom'

const FilterButtonNavigation = props => {
	return (
		<div className={classes.FilterButtonDiv}>
			<div>
				<Link
					to='/'
					className={classes.FilterButton + (props.active === 'all' ? ' ' + classes.FilterButtonActive : '' )}
					>All Tasks</Link>
				<Link
					to='/tasks/done/page/1'
					className={classes.FilterButton + (props.active === 'done' ? ' ' + classes.FilterButtonActive : '' )}
					>Done</Link>
				<Link
					to='/tasks/pending/page/1'
					className={classes.FilterButton + (props.active === 'pending' ? ' ' + classes.FilterButtonActive : '' )}
					>Pending</Link>
			</div>
		</div>
	)
}

export default FilterButtonNavigation