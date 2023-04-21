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
	const [message, setMessage] = useState({text: '', show: 0, error: 1});
	return (
		<div className={classes.FormLogin}>
			<h2>Login</h2>
			<form id="loginForm">
				{
					message.show ? (
						<p className={classes.Message + ' ' + (message.error? classes.Error : classes.Success)}>
							{message.text !== '' ? message.text: <br/>}
						</p>
					) : null
				}
				<Input
					label="Email"
					attr={{
						value: "",
						id: "email",
						name: "email",
						type: "text",
						autoFocus: true,
						ref: emailRef,
						onChange: emailHandler,
						args_on_change: [message, setMessage]
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
						onChange: passwordHandler,
						args_on_change: [message, setMessage]
					}}
					/>
				<Button
					id="login"
					onClick={e => {
						props.loginHandler(e, emailRef, passwordRef, setMessage)
						// loginHandler.call(this, e, emailRef, passwordRef, setLoginError)
					}}
					>Login</Button>
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

const emailHandler = (e, setValue, setError, message, setMessage) => {
	setValue(e.target.value)
	
	if(message.show) setMessage({...message, show: 0})
	
	if(e.target.dataset.checkValidation === undefined){
		e.target.dataset.checkValidation = true		
	}
	else{
		let errorMessage = '';
		if(e.target.value === ''){
			errorMessage = 'Email field is required.'
		}
		setError(errorMessage)
	}

	if(e.target.value === ''){
		e.target.dataset.error = true
	}
	else{
		e.target.dataset.error = false
	}
}
const passwordHandler = (e, setValue, setError, message, setMessage) => {
	setValue(e.target.value)

	if(message.show) setMessage({...message, show: 0})

	if(e.target.dataset.checkValidation === undefined){
		e.target.dataset.checkValidation = true		
	}
	else{
		let error = '';
		if(e.target.value === ''){
			error = 'Password field is required.'
		}
		setError(error)
	}

	if(e.target.value === ''){
		e.target.dataset.error = true
	}
	else{
		e.target.dataset.error = false
	}
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