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
	// const [message, setMessage] = useState({text: <>OTP is sent to<b> {props.user.email}</b></>, show: 1, error: 0});
	const [timer, setTimer] = useState(<div className={classes.Timer}><div><AlertMessage error={false}>OTP expires in 60 seconds.</AlertMessage></div></div>)
	const [login, setLogin] = props.loginData
	
	useEffect(() => {
		setTimerFun(30, setTimer, () => {console.log('Hi'); setTimerFun(15, setTimer); })
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>	
			{login.from === 'login' && login.email !== null &&
				(
					<div className={classes.VerifyEmail}>
						<h2>Verify Email</h2>
						<form id="verifyEmailForm">
							{/* { message.show ?
								<AlertMessage error={message.error}>{message.text}</AlertMessage>
								: null
							} */}
							{timer}
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
			{login.from === 'signup' && login.email !== null &&
				(
					<>
						Signup
					</>
				)
			}
			{login.from === 'resetPassword' && login.email !== null &&
				(
					<>
						Reset Pass
					</>
				)
			}
		</>
	)
}

const setTimerFun = (totalSeconds = 60, setTimer, callback ) => {
	let seconds = totalSeconds
	let interval = null

	interval = setInterval(() => {
		if(seconds >= 0){
			let messageAlert = null
			if(seconds > 10) messageAlert = <AlertMessage error={false}>OTP expires in {seconds} seconds.</AlertMessage>
			else if(seconds > 0) messageAlert = <AlertMessage error={true}>OTP expires in {seconds} seconds.</AlertMessage>
			else messageAlert = <AlertMessage error={true}>OTP expired</AlertMessage>
			setTimer(
				<div className={classes.Timer}>
					<div>
						{messageAlert}
					</div>
				</div>
			)
			if(seconds === 0 && typeof callback === typeof (()=>{}) ) callback()
			seconds--
		}
		else{
			clearInterval(interval)
		}
	}, 1000);
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