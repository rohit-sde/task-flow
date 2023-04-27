import React, {useRef, useState, useEffect} from 'react'
import classes from './FormVerifyEmail.module.scss'
import Input from '../../UI/Input/Input'
import Button from './../../UI/Button/Button'
import {useHistory} from 'react-router-dom'
import AlertMessage from './../../UI/AlertMessage/AlertMessage'
import { connect } from 'react-redux'

const FormVerifyEmail = props => {
	const otpRef = useRef();
	const histroy = useHistory();
	const [loginError, setLoginError] = useState('');
	const [message, setMessage] = useState({text: '', show: 0, error: 1});
	console.log(props.user)

	useEffect(() => {
		if(props.user.email !== null){
			let text = <>OTP is sent to<b> {props.user.email}</b></>
			setMessage({text: text, show: 1, error: 0})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className={classes.VerifyEmail}>
			<h2>Login</h2>
			<form id="loginForm">
				{ message.show ?
					<AlertMessage error={message.error}>{message.text}</AlertMessage>
					: null
				}
				<Input
					label="OTP"
					attr={{
						value: "",
						id: "emailVerifyOTP",
						name: "emailVerifyOTP",
						type: "text",
						autoFocus: true,
						ref: otpRef,
						onChange: otpHandler
					}}
					/>
				<Button
					id="login"
					onClick={e => {
						verifyEmailHandler.call(this, e, otpRef, setLoginError)
					}}
					>Verify Email</Button>
				<p className={classes.Error}>{loginError !== '' ? loginError: <br/>}</p>
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

const otpHandler = (e, setValue, setError) => {
	setValue(e.target.value)
	console.log('Email Verified')
}
const verifyEmailHandler = (e, emailRef, setLoginError) => {
	let email = emailRef.current.value
	
	e.preventDefault()
	console.log(e)
	console.log(email)
	setLoginError("Whooore")
}

const mapStateToProps = state => {
	return {
		user: state.auth.user
	}
}
export default connect(mapStateToProps)(FormVerifyEmail)