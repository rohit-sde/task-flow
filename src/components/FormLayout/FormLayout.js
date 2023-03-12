import React from 'react';
import FormLogin from './FormLogin/FormLogin'
import classes from './FormLayout.module.scss'
import logo from './logo-transparent-192x192.png'
import textImage from './task-cutive.JPG'

const FormLayout = props => {
	let clsNames = [classes.FormLayout]
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
			{/* Font Family used: https://fonts.google.com/specimen/Akronim */}
			<div className={classes.taskCutiveImage} style={{backgroundImage: `url("${textImage}")`}}></div>
			<hr/>
			<div><FormLogin/></div>
			<div>{text}</div>
		</div>
	)
}

export default FormLayout