import React from 'react';
// import classes from './VerifyOTP.module.scss'
import Input from './../../../UI/Input/Input'
import Button from './../../../UI/Button/Button'

const VerifyOTP = props => {
	return (
		<form>
			<Input
				label="OTP"
				attr={{
					id: "verifyOTP",
					name: "verifyOTP",
					type: "text"
				}}
				/>
			<Button
				id="verifyOTP"
				onClick={props.onClick}
				>Verify OTP</Button>
		</form>
	)
}

export default VerifyOTP;