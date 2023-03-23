import React, {useRef, useState} from 'react'
import classes from './FormResetPassword.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import {Link, useHistory} from 'react-router-dom'
import GetEmail from './GetEmail/GetEmail'
import VerifyOTP from './VerifyOTP/VerifyOTP'
import SetNewPassword from './SetNewPassword/SetNewPassword'

const FormResetPassword = props => {
	// Possible States: getEmail, verifyOTP, setNewPassword
	// const [state, setState] = useState('getEmail')
	const [state, setState] = useState('setNewPassword')
	const [resetPassError, setResetPassError] = useState('')

	let render = null;
	switch(state){
		case 'verifyOTP':
			render = <VerifyOTP/>
			break;
		case 'setNewPassword':
			render = <SetNewPassword/>
			break;
		default:
			render = <GetEmail/>
			break;
	}
	return (
		<div className={classes.FormResetPassword}>
			<h2>Reset Password</h2>
			{render}
			<p className={classes.Error}>{resetPassError !== '' ? resetPassError: <br/>}</p>
			<hr/>
			<p className={classes.GoToLoginPage}>
				{`Go to `}
				<Link to="/login">Login</Link>
				{` page`}
			</p>
		</div>
	)


	/* const emailRef = useRef();
	const passwordRef = useRef();
	const histroy = useHistory();
	const [loginError, setLoginError] = useState('');
	return (
		<div className={classes.FormLogin}>
			<h2>Login</h2>
			<form id="resetPasswordForm">
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
						loginHandler.call(this, e, emailRef, passwordRef, setLoginError)
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
		
	) */
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
export default FormResetPassword