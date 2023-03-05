import React from 'react';
import classes from './FormBody.module.scss'
import logo from './logo-transparent-192x192.png'

const FormBody = props => {
	let clsNames = [classes.FormBody]
	props.formType === 'Login' && clsNames.push(classes[props.formType])
	clsNames = clsNames.join(' ')
	let text = Array.from({length: 10}, (v, i) => <p key={i*i}>{i}</p>)
	// console.log(logo)

	return (
		<div className={clsNames}>
			<div className={classes.Logo}>
				<div>
					<img src={logo} alt="Logo"/>
				</div>
			</div>
			<div>{text}</div>
		</div>
	)
}

export default FormBody