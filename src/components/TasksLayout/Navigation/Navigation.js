import React from 'react'
import classes from './Navigation.module.scss'
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons"
import { CgProfile } from "react-icons/cg"
import { IoIosLogOut } from "react-icons/io"
import { IoAddCircleOutline } from "react-icons/io5"
import { connect } from 'react-redux'
import * as actions from './../../../store/actions/index'
import DialogAlert from './../../UI/DialogAlert/DialogAlert'
import { axiosAuth } from '../../../axios'

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
						<Link to="/profile" title="Profile">
							<IconContext.Provider value={{ color: 'white', size: '1.8em' }}>
								<CgProfile/>
							</IconContext.Provider>
						</Link>
					</li>
					<li>
						<div title="Logout" onClick={logoutHandler.bind(null, props.updateBackdrop, props.updateAuth)}>
							<IconContext.Provider value={{ color: 'white', size: '2em' }}>
								<IoIosLogOut/>
							</IconContext.Provider>
						</div>
					</li>
				</ul>
			</div>
		</div>
	)
}

const logoutHandler = (updateBackdrop, updateAuth) => {
	const cbSuccessFun = (updateBackdrop, e) => {
		// console.log('here', updateBackdrop)
		axiosAuth(axios => {
			axios.post('users/logout', {refreshToken: window.localStorage.getItem('task-cutive-token')})
			.then(res => {
				// console.log(res)
				if(res.data.status){
					updateBackdrop({
						show: false,
						data: null
					})
					window.localStorage.removeItem('task-cutive-token')
					updateAuth({
						isLoggedIn: false,
						accessToken: null,
						refreshToken: null
					})
					window.location.reload()
				}
				else{
					// console.log(res.data)
				}
			})
			.catch(e => {
				// console.log(e)
			})
		})
	}
	updateBackdrop({
		show: true,
		data: <DialogAlert cbSuccess={cbSuccessFun} title="Confirm logout" textSuccess="LOGOUT"/>
	})
}

const mapDispatchToProps = dispatch => {
	return {
		updateAuth: (...args) => dispatch( actions.updateAuth(...args) ),
		updateBackdrop: (...args) => dispatch( actions.updateBackdrop(...args) )
	}
}

export default connect(null, mapDispatchToProps)(Navigation)