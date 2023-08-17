import React, {useRef, useState} from 'react'
import classes from './FormSignup.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import {Link, useHistory} from 'react-router-dom'
import AlertMessage from './../../UI/AlertMessage/AlertMessage'
import { connect } from 'react-redux'
import * as actions from './../../../store/actions/index'

const FormSignup = props => {
	const fnameRef = useRef();
	const lnameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const setValueRef = {}
	const setValueRefFun = (obj, field, setValueRef) => { 
		// console.log(obj)
		// console.log(field)
		// console.log(setValueRef)
		obj[field] = setValueRef }

	const history = useHistory();
	const [message, setMessage] = useState({text: '', show: 0, error: 1});
	return (
		<div className={classes.FormSignup}>
			<h2>Create New Account</h2>
			<form id="signupForm">
				{ message.show ?
					<AlertMessage error={message.error}>{message.text}</AlertMessage>
					: null
				}
				<div id="fname_lname_con">
					<Input
						label="First Name"
						setValue={setValueRefFun.bind(null, setValueRef, 'fname')}
						attr={{
							value: "",
							id: "fname",
							name: "fname",
							type: "text",
							autoFocus: true,
							ref: fnameRef,
							onChange: fnameHandler,
							args_on_change: [message, setMessage]
						}}
						/>
					<Input
						label="Last Name"
						setValue={setValueRefFun.bind(null, setValueRef, 'lname')}
						attr={{
							value: "",
							id: "lname",
							name: "lname",
							type: "text",
							ref: lnameRef,
							onChange: lnameHandler,
							args_on_change: [message, setMessage]
						}}
					/>
				</div>
				<Input
					label="Email"
					setValue={setValueRefFun.bind(null, setValueRef, 'email')}
					attr={{
						value: "",
						id: "email",
						name: "email",
						type: "text",
						ref: emailRef,
						onChange: emailHandler,
						args_on_change: [message, setMessage]
					}}
					/>
				<Input
					label="Password"
					setValue={setValueRefFun.bind(null, setValueRef, 'pass')}
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
					id="signup"
					onClick={e => {
						const formResetFun = formReset.bind(null, setValueRef, setMessage)
						signupHandler.call(this, e, fnameRef, lnameRef, emailRef, passwordRef, message, setMessage, props.signUp, formResetFun, history, props.loginData, props.updateWaitLoader)
					}}
					>Signup</Button>
				<hr/>
				<p className={classes.ForgotPassword}>
					{`Existing user? `}
					<Link to="/login">Login</Link>
				</p>
			</form>
		</div>
		
	)
}

const fnameHandler = (e, setValue, setError, message, setMessage) => {
	setValue(e.target.value)
	
	if(message.show) setMessage({...message, show: 0})
	
	let errorMessage = '';
	if(e.target.dataset.checkValidation === undefined){
		e.target.dataset.checkValidation = true		
	}
	else{
		errorMessage = validate('fname', e.target.value)
		setError(errorMessage)
	}

	if(errorMessage === ''){
		e.target.dataset.error = false
	}
	else{
		e.target.dataset.error = true
	}
}
const lnameHandler = (e, setValue, setError, message, setMessage) => {
	setValue(e.target.value)
	
	if(message.show) setMessage({...message, show: 0})
	
	let errorMessage = '';
	if(e.target.dataset.checkValidation === undefined){
		e.target.dataset.checkValidation = true		
	}
	else{
		errorMessage = validate('lname', e.target.value)
		setError(errorMessage)
	}

	if(errorMessage === ''){
		e.target.dataset.error = false
	}
	else{
		e.target.dataset.error = true
	}
}
const emailHandler = (e, setValue, setError, message, setMessage) => {
	setValue(e.target.value)
	
	if(message.show) setMessage({...message, show: 0})
	
	let errorMessage = '';
	if(e.target.dataset.checkValidation === undefined){
		e.target.dataset.checkValidation = true		
	}
	else{
		errorMessage = validate('email', e.target.value)
		setError(errorMessage)
	}

	if(errorMessage === ''){
		e.target.dataset.error = false
	}
	else{
		e.target.dataset.error = true
	}
}
const passwordHandler = (e, setValue, setError, message, setMessage) => {
	setValue(e.target.value)
	
	if(message.show) setMessage({...message, show: 0})
	
	let errorMessage = '';
	if(e.target.dataset.checkValidation === undefined){
		e.target.dataset.checkValidation = true		
	}
	else{
		errorMessage = validate('pass', e.target.value)
		setError(errorMessage)
	}
	if(errorMessage === ''){
		e.target.dataset.error = false
	}
	else{
		e.target.dataset.error = true
	}
}
const validate = (what, text) => {
	let error = ''
	switch (what) {
		case 'fname':
			if(text === '') error = 'First name is required.'
			else if(text.match(/[a-zA-Z0-9. ]/g) && text.match(/[a-zA-Z0-9. ]/g).length !== text.length)
				error = 'Invalid first name.'
			return error
		case 'lname':
			if(text === '') error = 'Last name is required.'
			else if(text.match(/[a-zA-Z0-9. ]/g) && text.match(/[a-zA-Z0-9. ]/g).length !== text.length)
				error = 'Invalid last name.'
			return error			
		case 'email':
			if(text === '') error = 'Email is required.'
			else if( !(/\S+@\S+\.\S+/.test(text) ) ) error = 'Invalid email.'
			return error			
		case 'pass':
			if(text === '') error = 'Password is required.'
			else if(text.length < 8) error = 'Weak password.'
			else if( !(/[a-z]/).test( text ) ) error = 'Use at least 1 lowercase alphabet.'
			else if( !(/[A-Z]/).test( text ) ) error = 'Use at least 1 uppercase alphabet.'
			else if( !(/[0-9]/).test( text ) ) error = 'Use at least 1 numeric character.'
			else if( !(/[!@#$%^&*()]/).test( text ) ) error = 'Use at least 1 character: !@#$%^&*()'
			return error

		default:
			return error
	}
}
const signupHandler = (e, fnameRef, lnameRef, emailRef, passwordRef, message, setMessage, signUp, formReset, history, loginData, updateWaitLoader) => {
	e.preventDefault()

	let fname = fnameRef.current.value
	let lname = lnameRef.current.value
	let email = emailRef.current.value
	let pass = passwordRef.current.value
	
	let error = 
	validate('fname', fname) ||
	validate('lname', lname) ||
	validate('email', email) ||
	validate('pass', pass)

	if(error){
		setMessage({
			text: error,
			show: 1,
			error: 1
		})
	}
	else{
		signUp({fname, lname, email, pass}, formReset, setMessage, history, loginData, updateWaitLoader)
	}
}
const formReset = (setValueRef, setMessage) => {
	setValueRef.fname('')
	setValueRef.lname('')
	setValueRef.email('')
	setValueRef.pass('')
	setMessage({
		text: '',
		show: 0,
		error: 1
	})
}

const mapDispatchToProps = dispatch => {
	return {
		signUp: (...args) => dispatch(actions.signUp(...args)),
		updateWaitLoader: (...args) => dispatch(actions.updateWaitLoader(...args))
	}
}
export default connect(null, mapDispatchToProps)(FormSignup)