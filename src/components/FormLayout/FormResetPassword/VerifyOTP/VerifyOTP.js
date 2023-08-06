import React, {forwardRef, useEffect, useState, useRef} from 'react'
import classes from './VerifyOTP.module.scss'
import Input from './../../../UI/Input/Input'
import Button from './../../../UI/Button/Button'
import AlertMessage from '../../../UI/AlertMessage/AlertMessage'
import axios from './../../../../axios'

const VerifyOTP = (props, refObj) => {
	// console.log(props)
	// console.log(refObj)

	const defaultSeconds = 60
	const defaultTimerRef = useRef( <div className={classes.Timer}><div><AlertMessage error={defaultSeconds <= 10}>OTP expires in {defaultSeconds} seconds.</AlertMessage></div></div> )
	const timerHook = useState( defaultTimerRef.current )
	const [timer, setTimer] = timerHook

	const stateHook = useState({
		intervalRef: useRef(null),
		defaultSeconds: defaultSeconds,
		secondsRef: useRef(defaultSeconds),
	})
	
	useEffect(() => {
		if(props.otpSent && stateHook[0].secondsRef.current === defaultSeconds){
			// const [state, setState] = stateHook
			// console.log('Mounted')
			setTimerFun(stateHook, setTimer, () => {
				// console.log('reset Timer')
				props.setPage({
					name: 'verifyOTP',
					props: {userId: props.userId, userEmail: props.userEmail, otpSent: false, setPage: props.setPage}
				})
				stateHook[1]({
					...stateHook[0],
					secondsRef: {
						current: defaultSeconds
					}
				})
				setTimer(defaultTimerRef.current)
				props.messageStateHook[1]({text: '', show: 0, error: 0})
			})
		}
	})

	return (
		<form className={classes.VerifyOTP}>
			{ props.otpSent ? (
				<>
					{timer}
					<Input
						label="OTP"
						attr={{
							id: "verifyOTP",
							name: "verifyOTP",
							type: "text",
							autoComplete: 'off',
							onChange: otpHandler,
							args_on_change: [props.messageStateHook]
						}}
						ref={refObj}
						refSet="otpRef"
						/>
					<Button
						id="verifyOTP"
						onClick={ props.onClick.bind(null, ...props.verifyOTPHandlerArgs, timerHook, stateHook) }
						>Verify OTP</Button>
				</>
				) : (
					<>
						<AlertMessage error>OTP is expired.</AlertMessage>
						<Button
							id="resendOTP"
							onClick={resenOTP.bind(null, props.userId, props.userEmail, props.setPage, props.messageStateHook[1])}
							>Resend OTP</Button>
						<br/>
					</>
				)
			}
			
		</form>
	)
}

const otpHandler = (e, setValue, setError, messageStateHook) => {
	const [message, setMessage] = messageStateHook
	if(message !== ''){
		setMessage({text: '', show: 0, error: 0})
	}
	// console.log(e.target.value)
	const value = e.target.value
	if(value.length <= 6 && value.length > 0){
		const match = value.match(/\d/g)
		// console.log(match)
		if(match && match.length === value.length){
			setValue(e.target.value)
		}
		else{
			setMessage({text: 'Only numeric characters are allowed', show: 1, error: 1})
		}
	}
	else if(value.length > 6){
		setValue(value.slice(0, 6))
		setMessage({text: 'Only six digits are allowed.', show: 1, error: 1})
	}
	else{
		setValue( '' )
		setMessage({text: 'OTP is required.', show: 1, error: 1})
	}
}

const resenOTP = (userId, userEmail, setPage, setMessage, e) => {
	e.preventDefault()
	axios.patch('/users/000000000000000000000000/verifyEmail', {email: userEmail} )
		.then(res => {
			// console.log(res)
			if(res.data.status){
				let data = res.data.data
				const userId = data._id
				setPage({
					name: 'verifyOTP',
					props: {userId, userEmail, otpSent: true, setPage}
				})
			}
			else{
				setMessage('Something went wrong.')
			}
		})
		.catch(e => {
			// console.log(e)
			setMessage('Something went wrong.A')
		})

	// console.log("Resend OTP")
}

const setTimerFun = (stateHook, setTimer, callback) => {
	const [state, setState] = stateHook
	let seconds = state.secondsRef.current
	
	// console.log(state)
	// console.log(seconds)
	state.intervalRef.current = setInterval(() => {
		if(seconds >= 0){
			let messageAlert = null
			if(seconds > 10) messageAlert = <AlertMessage error={false}>OTP expires in {seconds} seconds.</AlertMessage>
			else if(seconds > 0) messageAlert = <AlertMessage error={true}>OTP expires in {seconds} seconds.</AlertMessage>
			else messageAlert = <AlertMessage error={true}>OTP expired.</AlertMessage>
			setTimer(
				<div className={classes.Timer}>
					<div>
						{messageAlert}
					</div>
				</div>
			)
			if(seconds === 0 && typeof callback === typeof (()=>{}) ){
				clearInterval(state.intervalRef.current)
				callback()
			}
			seconds--
			state.secondsRef.current--
		}
		else{
			clearInterval( state.intervalRef.current )
			if (typeof callback === typeof (()=>{}) ) callback()
		}
	}, 1000);
}

export default forwardRef(VerifyOTP);