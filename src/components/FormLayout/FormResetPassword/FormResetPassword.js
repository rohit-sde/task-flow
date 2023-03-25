import React, {useRef, useState} from 'react'
import classes from './FormResetPassword.module.scss'
import {Link} from 'react-router-dom'
import GetEmail from './GetEmail/GetEmail'
import VerifyOTP from './VerifyOTP/VerifyOTP'
import SetNewPassword from './SetNewPassword/SetNewPassword'

const FormResetPassword = props => {
	// Possible States: getEmail, verifyOTP, setNewPassword
	const [state, setState] = useState('getEmail')
	// const [state, setState] = useState('setNewPassword')
	const [resetPassError, setResetPassError] = useState('')

	let render = null;
	switch(state){
		case 'verifyOTP':
			render = <VerifyOTP
						onClick={verifyOTPHandler.bind(null, setState)}
						/>
			break;
		case 'setNewPassword':
			render = <SetNewPassword
						onClick={setPasswordHandler.bind(null, setState)}
						/>
			break;
		default:
			render = <GetEmail
						onClick={sendOTPHandler.bind(null, setState)}
						/>
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
}

const sendOTPHandler = (setState, e) => {
	e.preventDefault()
	setState('verifyOTP')
}
const verifyOTPHandler = (setState, e) => {
	e.preventDefault()
	setState('setNewPassword')
}
const setPasswordHandler = (setState, e) => {
	e.preventDefault()
	console.log("done")
}
export default FormResetPassword