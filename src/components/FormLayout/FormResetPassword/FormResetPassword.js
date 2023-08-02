import React, {useRef, useState} from 'react'
import classes from './FormResetPassword.module.scss'
import {Link} from 'react-router-dom'
import GetEmail from './GetEmail/GetEmail'
import VerifyOTP from './VerifyOTP/VerifyOTP'
import SetNewPassword from './SetNewPassword/SetNewPassword'
import axios from './../../../axios'
import AlertMessage from '../../UI/AlertMessage/AlertMessage'
import * as actions from './../../../store/actions/index'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const FormResetPassword = props => {
	// Possible States: getEmail, verifyOTP, setNewPassword
	const [page, setPage] = useState({name: 'getEmail', props: {}})
	// const [page, setPage] = useState({name: 'setNewPassword', props: {}})
	
	const messageStateHook = useState({text: '', show: 0, error: 0})
	const [message, setMessage] = messageStateHook
	const emailRef = useRef( null )
	const otpRef = useRef( null )
	const pass1Ref = useRef( null )
	const pass2Ref = useRef( null )

	const authStore = {auth: props.auth, updateAuth: props.updateAuth}
	const history = useHistory()
	const refObj = useRef({ emailRef, otpRef, pass1Ref, pass2Ref, authStore, history })

	const verifyOTPHandlerArgs = [setPage, otpRef, page.props.userId, page.props.userEmail, setMessage]

	let render = null;
	switch(page.name){
		case 'verifyOTP':
			render = <VerifyOTP
						onClick={verifyOTPHandler}
						verifyOTPHandlerArgs={verifyOTPHandlerArgs}
						ref={refObj}
						messageStateHook={messageStateHook}
						{...page.props}
						/>
			break;
		case 'setNewPassword':
			render = <SetNewPassword
						onClick={setPasswordHandler.bind(null, setPage, refObj, setMessage)}
						ref={refObj}
						messageStateHook={messageStateHook}
						{...page.props}
						/>
			break;
		default:
			render = <GetEmail
						onClick={sendOTPHandler.bind(null, setPage, emailRef, setMessage)}
						ref={refObj}
						messageStateHook={messageStateHook}
						{...page.props}
						/>
			break;
	}
	return (
		<div className={classes.FormResetPassword}>
			<h2>Reset Password</h2>
			{message.show ?
				<AlertMessage error={message.error ? true : false}>{message.text}</AlertMessage>
				: <br/>
			}
			{/* <p className={classes.Error}>{resetPassError !== '' ? resetPassError: <br/>}</p> */}
			{render}
			<hr/>
			<p className={classes.GoToLoginPage}>
				{`Go to `}
				<Link to="/login">Login</Link>
				{` page`}
			</p>
		</div>
	)
}

const sendOTPHandler = (setPage, emailRef, setMessage, e) => {
	e.preventDefault()

	let email = emailRef.current.value

	if(email.length === 0){
		setMessage({text: 'Email required.', error: 1, show: 1})
	}
	else if(! ( /\S+@\S+\.\S+/.test(email) ) ){
		setMessage({text: 'Invalid Email.', error: 1, show: 1})
	}
	else{
		axios.patch('/users/000000000000000000000000/verifyEmail', {email})
		.then(res => {
			// console.log(res)
			if(res.data.status){
				let data = res.data.data
				const userId = data._id
				setPage({
					name: 'verifyOTP',
					props: {userId, userEmail: email, otpSent: true, setPage}
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
	}
}
const verifyOTPHandler = (setPage, otpRef, userId, userEmail, setMessage, timerHook, stateHook, e) => {
	e.preventDefault()
	// console.log(setPage, otpRef, userId, userEmail, setMessage, timerHook, stateHook, e)

	let otp = otpRef.current.value
	let match = otp.match(/\d/g)
	if(match === null){
		setMessage('OTP is required.')
	}
	else if(match.length === 6){
		// console.log(otp)
		// console.log(otp.length)
		// setPage('setNewPassword')
		timerHook[1]('')
		if(stateHook[0].intervalRef.current != null) clearInterval(stateHook[0].intervalRef.current)
		axios.patch(`/users/${userId}/verifyEmail`, {otp: Number(otp)})
		.then(res => {
			// console.log(res)
			if(res.data.status){
				let data = res.data.data
				const accessToken = data.accessToken
				setPage({
					name: 'setNewPassword',
					props: {userId, userEmail, accessToken, setPage}
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
	}
	else{
		setMessage('Only six characters are allowed.')
	}
}
const setPasswordHandler = (setPage, refObj, setMessage, e) => {
	e.preventDefault()
	const pass1 = refObj.current.pass1Ref.current.value
	const pass2 = refObj.current.pass2Ref.current.value
	const userEmail = refObj.current.props.userEmail
	const userId = refObj.current.props.userId
	const accessToken = refObj.current.props.accessToken
	const userPass = pass2

	let validation = refObj.current.validatePass(pass1)
	if(validation.length === 0 && pass1 !== pass2){
		validation = 'Password not matched.'
	}
	if(validation.length !== 0){
		setMessage( {text: validation, show: 1, error: 1} )
	}
	else{
		setMessage( {text: '', show: 0, error: 0} )

		axios.patch('/users/resetPassword', {
			email: userEmail,
			newPass: userPass
		},
		{
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		})
			.then(res => {
				// console.log(res)
				if(res.data.status){
					setMessage( {text: 'Password has been Reset successfully.', show: 1, error: 0} )

					setTimeout( () => {
						axios.post('/users/login', {
							userEmail,
							userPass
						})
							.then(res => {
								// console.log(res)
								if(res.data.status){
									let data = res.data.data
									// console.log(data)
									// console.log(refObj)
									const auth = refObj.current.authStore.auth
									const updateAuth = refObj.current.authStore.updateAuth
									// console.log(refObj.current)
									const payload = {
										...auth,
										user: {
											...auth.user,
											...data.user
										},
										accessToken: data.token.accessToken,
										refreshToken: data.token.refreshToken,
										isLoggedIn: true
									}
									localStorage.setItem('task-cutive-token', data.token.refreshToken)
									updateAuth(payload)
									refObj.current.history.history.push('/')
									// console.log('¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬')
									// if(typeof updateAuth) updateAuth(payload)
									// console.log('¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬')
								}
								else{
									// console.log('[Login Error]')
									// console.log('[Login Error] - ' + res.data.message)
								}
							})
							.catch(e => {
								// console.log('[Login Error] catch block')
								// console.log(e)
							})
					}, 800)
				}
				else{
					setMessage( {text: 'Failed to reset password.', show: 1, error: 1} )
				}
			})
			.catch(e => {
				// console.log(e)
				setMessage( {text: 'Something went wrong. Try again later.', show: 1, error: 1} )
			})
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}
const mapDispatchToProps = dispatch => {
	return {
		updateAuth: (...args) => { dispatch( actions.updateAuth(...args) ) }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FormResetPassword)