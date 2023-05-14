import React, {forwardRef} from 'react'
import Input from './../../../UI/Input/Input'
import Button from './../../../UI/Button/Button'

const SetNewPassword = (props, refObj) => {
	// console.log(props)
	refObj.current.props = props
	refObj.current.validatePass = validatePass

	return (
		<form>
			<Input
				label="New Password"
				attr={{
					id: "newPassword",
					name: "newPassword",
					type: "password",
					autoComplete: 'off',
					onChange: newPasswordHandler,
					args_on_change: [props.messageStateHook]
				}}
				ref={refObj}
				refSet="pass1Ref"
				/>
			<Input
				label="Retype Password"
				attr={{
					id: "retypePassword",
					name: "retypePassword",
					type: "password",
					autoComplete: 'off',
					onChange: retypePasswordHandler,
					args_on_change: [props.messageStateHook, refObj]
				}}
				ref={refObj}
				refSet="pass2Ref"
				/>
			<Button
				id="setNewPassword"
				onClick={props.onClick}
				>Set Password</Button>
		</form>
	)
}

const newPasswordHandler = (e, setValue, setError, messageStateHook) => {
	// console.log(e.target)
	let validation = validatePass(e.target.value)
	// console.log(validation, messageStateHook)
	// console.log(validation)
	if(validation.length !== 0){
		setError(validation)
	}
	else{
		setError('')
	}
	setValue(e.target.value)
	messageStateHook[1]( {text: '', show: 0, error: 0} )
}
const retypePasswordHandler = (e, setValue, setError, messageStateHook, refObj) => {
	const value = e.target.value
	const pass1 = refObj.current.pass1Ref.current.value
	setValue(value)
	if(value !== pass1){
		setError('Password not matched.')
	}
	else{
		setError('')
	}
	messageStateHook[1]( {text: '', show: 0, error: 0} )
}
const validatePass = (pass) => {
	let error = ''
	if(pass === '') error = 'Password is required.'
	else if(pass.length < 8) error = 'Weak password. Use atleast 8 charcters.'
	else if( !(/[a-z]/).test( pass ) ) error = 'Use at least 1 lowercase alphabet.'
	else if( !(/[A-Z]/).test( pass ) ) error = 'Use at least 1 uppercase alphabet.'
	else if( !(/[0-9]/).test( pass ) ) error = 'Use at least 1 numeric character.'
	else if( !(/[!@#$%^&*()]/).test( pass ) ) error = 'Use at least 1 character: !@#$%^&*()'
	return error
}

export default forwardRef(SetNewPassword)