import React from 'react'
import classes from './GetEmail.module.scss'
import Input from '../../../UI/Input/Input'
import Button from '../../../UI/Button/Button'

const GetEmail = props => {
	return (
		<form>
			<Input
				label="Email"
				attr={{
					id: "getEmail",
					name: "getEmail",
					type: "email"
				}}
				/>
			<Button
				id="sendOTP"
				>Send OTP</Button>
		</form>
	)
}

export default GetEmail;