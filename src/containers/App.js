import React, { useEffect } from 'react'
import FormLayout from '../components/FormLayout/FormLayout'
import TaskLayout from '../components/TasksLayout/TasksLayout'
import clssses from'./App.module.scss'
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import * as actions from './../store/actions/index'
import NotFound from './../components/NotFound/NotFound'

const App = props => {
	let histroy = useHistory()
	console.log('[App]', props)
	useEffect(() => {
		const accessToken = localStorage.getItem('task-cutive-token');
		if(accessToken){
			console.log( accessToken.split('.') )
			let accessTokenParts = accessToken.split('.')
			// let iat = atob(accessTokenParts[1])
			// console.log(iat)
			// props.updateLoggedIn(true, histroy)
		}
		else{
		}
		// console.log(localStorage.)
		// console.log("[App] useEffect")
		// console.log(props.isLoggedIn)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={clssses.App}>
			<Switch>
				<Route path="/" exact>
					{ props.isLoggedIn ?
						(
							<TaskLayout/>
						) :
						(
							<Redirect to="/login"/>
						)
					}
				</Route>
				<Route path="/login">
					<FormLayout formType="Login"/>
				</Route>
				<Route path="/signup">
					<FormLayout formType="Signup"/>
				</Route>
				<Route path="/resetPassword">
					<FormLayout formType="ResetPassword"/>
				</Route>
				<Route path="/verifyEmail">
					<FormLayout formType="VerifyEmail"/>
				</Route>
				<Route path="/">
					<NotFound/>
				</Route>
			</Switch>
			
		</div>
	);
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn
	}
}
const mapDispatchToProps = dispatch => {
	return {
		updateLoggedIn: (...args) => dispatch( actions.updateLoggedIn(...args) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)