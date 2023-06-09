import React from 'react'
import classes from './Navigation.module.scss'
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

const Navigation = props => {
	return (
		<div className={classes.Navigation}>
			<div className={classes.Logo}><Link to='/'>Task Cutive</Link></div>
			<div className={classes.AddTask}>
				<Link to="/addTask" title="Profile">
					<IconContext.Provider value={{size: '2.5em' }}>
						<IoAddCircleOutline/>
					</IconContext.Provider>
				</Link>
			</div>
			<div className={classes.NavLinks}>
				<ul>
					<li>
						<a href="/profile" title="Profile">
							<IconContext.Provider value={{ color: 'white', size: '1.8em' }}>
								<CgProfile/>
							</IconContext.Provider>
						</a>
					</li>
					<li>
						<a href="/logout" title="Logout">
							<IconContext.Provider value={{ color: 'white', size: '2em' }}>
								<IoIosLogOut/>
							</IconContext.Provider>
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navigation