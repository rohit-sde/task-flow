import React, {useRef, useState, useEffect} from 'react'
import classes from './FormVerifyEmail.module.scss'
import Input from '../../UI/Input/Input'
import Button from './../../UI/Button/Button'
import {useHistory} from 'react-router-dom'
import AlertMessage from './../../UI/AlertMessage/AlertMessage'
import { connect } from 'react-redux'
import axios from './../../../axios'
import * as actions from './../../../store/actions/index'

const FormVerifyEmail = props => {
	const otpRef = useRef();
	const history = useHistory();
	const [loginError, setLoginError] = useState('');
	// const [message, setMessage] = useState({text: <>OTP is sent to<b> {props.user.email}</b></>, show: 1, error: 0});
	const defaultSecondsRef = useRef( 60 )
	const [seconds, setSeconds] = useState( defaultSecondsRef.current )
	const defaultTimerRef = useRef( <div className={classes.Timer}><div><AlertMessage error={seconds <= 10}>OTP expires in {seconds} seconds.</AlertMessage></div></div> )
	const [timer, setTimer] = useState( defaultTimerRef.current )
	const [login, setLogin] = props.loginData
	const timerIsSet = useRef(false)
	const intervalRef = useRef();
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		// console.log( !timerIsSet.current && login.from === 'login' && login.email !== null && login.otpSent && !login.otpResend )
		// console.log( !timerIsSet.current ? 'T' : 'F' )
		// console.log( login.from === 'login' ? 'T' : 'F' )
		// console.log( login.email !== null ? 'T' : 'F' )
		// console.log( login.otpSent ? 'T' : 'F' )
		// console.log( !login.otpResend ? 'T' : 'F' )
		// console.log( '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' )

		if( !timerIsSet.current && login.from === 'login' && login.email !== null && login.otpSent && !login.otpResend ){
			// console.log('[FormVerifyEmail] useEffect')
			// console.log(login)
			timerIsSet.current = true
			setTimerFun(intervalRef, seconds, setSeconds, setTimer, () => {
				setTimer( defaultTimerRef.current )
				setSeconds( defaultSecondsRef.current )
				// console.log('reset')
				setLogin(state => {
					return {
						...state,
						otpSent: false,
						otpResend: true
					}
				})
			})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	})

	return (
		<>	
			{/* {seconds <= 0 &&
				(
					<div className={classes.VerifyEmail}>
						<h2>Verify Email</h2>
						<form id="verifyEmailForm">
							<AlertMessage error>OTP expired</AlertMessage>
							<Button
								id="resendOTP"
								onClick={e => {
									resendOTPHandler.call(this, e, otpRef, setLoginError)
								}}
								>Resend OTP</Button>
							<br/>
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
			} */}
			{login.from === 'login' && login.email !== null &&
				(
					<div className={classes.VerifyEmail}>
						{!login.otpSent && !login.otpResend &&
							<h2>First verify email</h2>
						}
						{login.otpSent && !login.otpResend &&
							<h2>Verify email</h2>
						}
						{!login.otpSent && login.otpResend &&
							<>
								<h2>First verify email</h2>
								<AlertMessage error>OTP expired.</AlertMessage>
							</>
						}
						<form>
							{!login.otpSent && !login.otpResend &&
								<Button
									id="sendOTP"
									onClick={e => {
										sendOTPHandler.call(this, e, props.user._id, props.loginData, setLoginError, history)
									}}
									>Verify Email</Button>
							}
							{login.otpSent && !login.otpResend &&
								<>
									{timer}
									<div className={classes.OTP}>
										<Input
											label="OTP"
											attr={{
												value: "",
												id: "VerifyOTP",
												name: "VerifyOTP",
												type: "text",
												autoFocus: true,
												autoComplete: 'off',
												ref: otpRef,
												onChange: otpHandler,
												args_on_change: [setLoginError]
											}}
											/>
									</div>
									<Button
										id="submitOTP"
										onClick={e => {
											submitOTPHandler.call(this, e, otpRef, intervalRef, props.loginData, props.user._id, props.auth, props.updateAuth, setLoginError, history)
										}}
										>Submit OTP</Button>
								</>
							}
							{ !login.otpSent && login.otpResend &&
								<>
									<Button
										id="resendOTP"
										onClick={e => {
											resendOTPHandler.call(this, e, props.user._id, props.loginData, timerIsSet, setLoginError, history)
										}}
										>Resend OTP</Button>
								</>
							}
							<br/>
							{loginError &&
								<AlertMessage error>{loginError}</AlertMessage>
							}
							<hr/>
							<p>
								<Button
									id="newAccount"
									styleType="Success"
									onClick={e => {
										e.preventDefault()
										history.push('/signup')
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

const setTimerFun = (intervalRef, totalSeconds, setSeconds, setTimer, callback ) => {
	let seconds = totalSeconds
	// console.log('Secc')
	// console.log(seconds)
	intervalRef.current = setInterval(() => {
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
			setSeconds(seconds)
		}
		else{
			clearInterval(intervalRef.current)
			setSeconds(totalSeconds)
		}
	}, 1000);
}
const sendOTPHandler = (e, userId, loginData, setLoginError, history) => {
	e.preventDefault()
	const [login, setLogin] = loginData

	axios.patch(`/users/${userId}/verifyEmail`)
		.then(res => {
			if(res.data.status){
				setLogin({
					...login,
					otpSent: true,
					otpResend: false
				})
				// console.log(res.data)
			}
			else{
				if( (/Email is already verified./).test(res.data.message) ){
					history.push('/')
				}
				else setLoginError('Something went wrong. Try again.')
				// console.log(res)
			}
		})
		.catch(e => {
			setLoginError('Something went wrong. Try again.')
			// console.log(e)
		})
}
const resendOTPHandler = (e, userId, loginData, timerIsSet, setLoginError, history) => {
	e.preventDefault()
	const [login, setLogin] = loginData

	axios.patch(`/users/${userId}/verifyEmail`)
		.then(res => {
			if(res.data.status){
				timerIsSet.current = false
				setLogin({
					...login,
					otpSent: true,
					otpResend: false
				})
				// console.log(res.data)
			}
			else{
				if( (/Email is already verified./).test(res.data.message) ){
					history.push('/')
				}
				else setLoginError('Something went wrong. Try again.')
				// console.log(res)
			}
		})
		.catch(e => {
			setLoginError('Something went wrong. Try again.')
			// console.log(e)
		})
}
const otpHandler = (e, setValue, setError, setLoginError) => {
	// console.log(e)
	// console.log(e.nativeEvent.data)
	setLoginError('')
	if( !e.nativeEvent.data || e.nativeEvent.data.match(/\d/g) ){
		if(e.target.value.length <= 6){
			setValue(e.target.value)
			setError('')
		}
		else{
			setError('Only six numbers are allowed.')
		}
	}
	else{
		setError('Only numeric characters are allowed.')
	}
}
const submitOTPHandler = (e, otpRef, intervalRef, loginData, userId, auth, updateAuth, setLoginError, history) => {
	e.preventDefault()
	let value = otpRef.current.value
	if(value && value.match(/\d/g).length === value.length && value.length === 6){
		// console.log(intervalRef)
		clearInterval(intervalRef.current)
		const [login, setLogin] = loginData
		
		axios.patch(`/users/${userId}/verifyEmail`, {otp: Number(value)})
			.then(res => {
				if(res.data.status){
					
					// login user
					axios.post(`/users/login`, { userEmail: login.email, userPass: login.pass } )
						.then(res => {
							if(res.data.status){
								let data = res.data.data
								localStorage.setItem('task-cutive-token', data.token.refreshToken)
								
								setLogin({
									...login,
									pass: null
								})
								const payload = {
									...auth,
									user: {
										...auth.user,
										...data.user,
										verifyMeta: {
											...auth.user.verifyMeta
										}
									},
									isLoggedIn: true,
									accessToken: data.token.accessToken,
									refreshToken: data.token.refreshToken
								}

								updateAuth(payload)

								setTimeout(() => {
									history.push('/')
								}, 1000)
							}
							else{
								history.push('/login')
							}
						})
						.catch(e => {
							history.push('/login')
							// console.log(e)
						})
				}
				else{
					if( (/OTP expired./).test(res.data.message) ){
						setLoginError('OTP expired.')
					}
					else if( (/Wrong OTP passed./).test(res.data.message) ){
						setLoginError('Failed: OTP not matched.')
					}
					else setLoginError('Something went wrong. Try again.')
				}
			})
			.catch(e => {
				setLoginError('Something went wrong. Try again.')
				// console.log(e)
			})
	}
	else{
		if(value.length === 6){
			setLoginError('Invalid OTP.')
		}
		else{
			setLoginError('OTP is 6 numeric chararcter long.')
		}
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
		user: state.auth.user
	}
}
const mapDispatchToProps = dispatch => {
	return {
		updateAuth: (...args) => dispatch( actions.updateAuth(...args) )
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FormVerifyEmail)