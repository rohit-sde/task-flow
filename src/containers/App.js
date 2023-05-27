import React, { useEffect, useState } from 'react'
import FormLayout from '../components/FormLayout/FormLayout'
import TaskLayout from '../components/TasksLayout/TasksLayout'
import Loading from './../components/Loading/Loading'
import clssses from'./App.module.scss'
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from './../store/actions/index'
import NotFound from './../components/NotFound/NotFound'
import {axiosAuth} from './../axios'

const App = props => {
	let history = useHistory()
	const loginData = useState(null)
	console.log('[App]', props)
	setInterval(() => {
		axiosAuth()
	}, 3000)
	// props.refreshToken()
	useEffect(() => {
		loginData[1](0)
		// if(!props.isLoggedIn){
		// 	const refreshToken = localStorage.getItem('task-cutive-token');
		// 	if(refreshToken){
		// 		props.refreshToken(refreshToken, history)
		// 	}
		// 	else{
		// 		props.updateLoadApp(true)
		// 	}
		// 	// props.updateLoggedIn(true, history)
		// }
		// console.log(history)
		console.log("[App] useEffect")
		// console.log(props.isLoggedIn)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Switch>
				<Route path="/" exact>/</Route>
				<Route path="/a">a</Route>
				<Route path="/b">b
					<Route path="/b/:x">/1</Route>
				</Route>
				<Route path="/c">c</Route>
			</Switch>
		</>
	)

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
										<FormLayout formType="Login" loginData={loginData}/>
									</Route>
									<Route path="/signup">
										<FormLayout formType="Signup" loginData={loginData}/>
									</Route>
									<Route path="/resetPassword">
										<FormLayout formType="ResetPassword" loginData={loginData}/>
									</Route>
									<Route path="/verifyEmail">
										{
											props.user.email !== null ?
												<FormLayout formType="VerifyEmail" loginData={loginData}/>
												: <Redirect to="/login"/>
										}
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
		loadApp: state.auth.loadApp,
		user: state.auth.user
	}
}
const mapDispatchToProps = dispatch => {
	return {
		updateLoadApp: (...args) => dispatch( actions.updateLoadApp(...args) ),
		// refreshToken: (...args) => dispatch( actions.refreshToken(...args) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)