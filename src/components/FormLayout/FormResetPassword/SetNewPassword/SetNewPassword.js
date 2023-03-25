import React from 'react';
import classes from './SetNewPassword.module.scss'
import Input from './../../../UI/Input/Input'
import Button from './../../../UI/Button/Button'

const SetNewPassword = props => {
	return (
		<form>
			<Input
				label="New Password"
				attr={{
					id: "newPassword",
					name: "newPassword",
					type: "password"
				}}
				/>
			<Input
				label="Retype Password"
				attr={{
					id: "retypePassword",
					name: "retypePassword",
					type: "password"
				}}
				/>
			<Button
				id="setNewPassword"
				onClick={props.onClick}
				>Set Password</Button>
		</form>
	)
}

export default SetNewPassword;