import React from 'react';
import classes from './Actions.module.scss';
import {IconContext} from 'react-icons'
import { IoMdDoneAll } from 'react-icons/io'
import { MdDeleteOutline } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'

const Actions = props => {
	return (
		<div className={classes.Actions}>
			<div className={classes.Done} data-taskdone="1">
				<IconContext.Provider value={{size: '1.5em' }}>
					<IoMdDoneAll tabindex="0"/>
				</IconContext.Provider>
			</div>
			<div className={classes.EditDelete}>
				<div className={classes.Edit}>
					<IconContext.Provider value={{size: '1.5em' }}>
						<BiEdit tabindex="0"/>
					</IconContext.Provider>
				</div>
				<div className={classes.Delete}>
					<IconContext.Provider value={{size: '1.5em' }}>
						<MdDeleteOutline tabindex="0"/>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	)
}

export default Actions