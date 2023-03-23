import React, {useRef, useState} from 'react'
import classes from './FormSignup.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import {Link, useHistory} from 'react-router-dom'

const FormSignup = props => {
	const fnameRef = useRef();
	const lnameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const histroy = useHistory();
	const [loginError, setLoginError] = useState('');
	return (
		<div className={classes.FormSignup}>
			<h2>Create New Account</h2>
			<form id="signupForm">
				<div id="fname_lname_con">
					<Input
						label="First Name"
						attr={{
							value: "",
							id: "fname",
							name: "fname",
							type: "text",
							autoFocus: true,
							ref: fnameRef,
							onChange: fnameHandler
						}}
						/>
					<Input
						label="Last Name"
						attr={{
							value: "",
							id: "lname",
							name: "lname",
							type: "text",
							autoFocus: true,
							ref: lnameRef,
							onChange: lnameHandler
						}}
					/>
				</div>
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
					id="signup"
					onClick={e => {
						signupHandler.call(this, e, fnameRef, lnameRef, emailRef, passwordRef, setLoginError)
					}}
					>Signup</Button>
				<p className={classes.Error}>{loginError !== '' ? loginError: <br/>}</p>
				<hr/>
				<p className={classes.ForgotPassword}>
					{`Existing user? `}
					<Link to="/login">Login</Link>
				</p>
			</form>
		</div>
		
	)
}

const fnameHandler = (e, setValue, setError) => {
	setValue(e.target.value)
}
const lnameHandler = (e, setValue, setError) => {
	setValue(e.target.value)
}
const emailHandler = (e, setValue, setError) => {
	setValue(e.target.value)
}
const passwordHandler = (e, setValue, setError) => {
	setValue(e.target.value)
}
const signupHandler = (e, fnameRef, lnameRef, emailRef, passwordRef, setLoginError) => {
	let fname = fnameRef.current.value
	let lname = lnameRef.current.value
	let email = emailRef.current.value
	let password = passwordRef.current.value
	
	e.preventDefault()
	console.log(e)
	console.log(email)
	console.log(password)
	setLoginError("Whooore")
}
export default FormSignup