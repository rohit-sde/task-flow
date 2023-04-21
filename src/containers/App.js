import React, { useEffect } from 'react'
import FormLayout from '../components/FormLayout/FormLayout'
import TaskLayout from '../components/TasksLayout/TasksLayout'
import Loading from './../components/Loading/Loading'
import clssses from'./App.module.scss'
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from './../store/actions/index'
import NotFound from './../components/NotFound/NotFound'

const App = props => {
	let history = useHistory()
	console.log('[App]', props)
	useEffect(() => {
		if(!props.isLoggedIn){
			const refreshToken = localStorage.getItem('task-cutive-token');
			if(refreshToken){
				props.refreshToken(refreshToken, history)
			}
			else{
				props.updateLoadApp(true)
			}
			// props.updateLoggedIn(true, history)
		}
		// console.log(history)
		console.log("[App] useEffect")
		// console.log(props.isLoggedIn)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={clssses.App}>
			{ !props.loadApp ?
				(
					<Loading/>
				) :
				(
					<Switch>
						{ props.isLoggedIn ?
							(
								<>
									<Route path="/" exact>
										<TaskLayout/>
									</Route>
									<Route path="/login">
										<Redirect to="/"/>
									</Route>
									<Route path="/signup">
										<Redirect to="/"/>
									</Route>
									<Route path="/resetPassword">
										<Redirect to="/"/>
									</Route>
									<Route path="/verifyEmail">
										<Redirect to="/"/>
									</Route>
								</>
							) :
							(
								<>
									<Route path="/" exact>
										<Redirect to="/login"/>
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
								</>
							)
						}
					
						<Route path="/">
							<NotFound/>
						</Route>
					</Switch>
				)
			}
			
		</div>
	);
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		loadApp: state.auth.loadApp
	}
}
const mapDispatchToProps = dispatch => {
	return {
		updateLoadApp: (...args) => dispatch( actions.updateLoadApp(...args) ),
		refreshToken: (...args) => dispatch( actions.refreshToken(...args) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)