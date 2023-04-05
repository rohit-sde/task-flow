import React, {useRef, useState} from 'react'
import classes from './FormLogin.module.scss'
import Input from '../../UI/Input/Input'
import Button from './../../UI/Button/Button'
import {Link, useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './../../../store/actions/index'

const FormLogin = props => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const histroy = useHistory();
	const [loginError, setLoginError] = useState('');
	console.log(props.isLoggedIn)
	return (
		<div className={classes.FormLogin}>
			<h2>Login</h2>
			<form id="loginForm">
				<Input
					label="Email"
					attr={{
						value: "",
						id: "email",
						name: "email",
						type: "text",
						autoFocus: true,
						ref: emailRef,
						onChange: emailHandler
					}}
					/>
				<Input
					label="Password"
					attr={{
						value: "",
						id: "pass",
						name: "pass",
						type: "password",
						ref: passwordRef,
						onChange: passwordHandler
					}}
					/>
				<Button
					id="login"
					onClick={e => {
						props.loginHandler(e, emailRef, passwordRef, setLoginError)
						// loginHandler.call(this, e, emailRef, passwordRef, setLoginError)
					}}
					>Login</Button>
				<p className={classes.Error}>{loginError !== '' ? loginError: <br/>}</p>
				<p className={classes.ForgotPassword}>
					<Link to="/resetPassword">Forgot Password</Link>
				</p>
				<hr/>
				<p>
					<Button
						id="newAccount"
						styleType="Success"
						onClick={e => {
							e.preventDefault()
							histroy.push('/signup')
						}}
						>Create New Account</Button>
				</p>
			</form>
		</div>
		
	)
}

const emailHandler = (e, setValue, setError) => {
	setValue(e.target.value)
}
const passwordHandler = (e, setValue, setError) => {
	setValue(e.target.value)
}
const loginHandler = (e, emailRef, passwordRef, setLoginError) => {
	let email = emailRef.current.value
	let password = passwordRef.current.value
	
	e.preventDefault()
	console.log(e)
	console.log(email)
	console.log(password)
	setLoginError("Whooore")
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.auth
	}
}
const mapDispatchToProps = dispatch => {
	return {
		loginHandler: (...args) => dispatch(actions.login(...args))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)