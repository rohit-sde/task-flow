import React, {useState} from 'react';
import classes from './Input.module.scss'

const Input = props => {
	/* 
		attr = {id, name}
	*/
	// console.log(props)
	let initialValue = props.attr.value && typeof props.attr.value === 'string' ? props.attr.value : ''
	delete props.attr.value
	const [value, setValue] = useState( initialValue )
	const [error, setError] = useState( '' )
	let attr = ( (typeof props.attr) === (typeof {}) ) ? props.attr : {}
	let div = ( (typeof props.div) === (typeof {}) ) ? props.div : {}
	let onChangeArgs = ( (typeof attr.args_on_change) === (typeof []) ) ? attr.args_on_change : []
	// console.log(onChangeArgs)
	let newAttr = {}
	for (const key in attr) {
		if (key !== 'args_on_change') {
			newAttr[key] = attr[key]
		}
	}
	attr = newAttr

	let classNames = [classes.Input]
	if(value !== '') classNames.push(classes.HideLabel)
	return (
		<div id={`${props.attr.id}_div`} className={classNames.join(' ')} {...div}>
			<input
				value={value}
				{...attr}
				onChange={
					(e) => {
						if( (typeof props.attr.onChange) === typeof (()=>{}) ){
							// console.log(onChangeArgs)
							props.attr.onChange.call(null, e, setValue, setError, ...onChangeArgs)
						}
						else{
							setValue(e.target.value);
						}
					}
				}
				/>
			<label htmlFor={props.attr.id}>{props.label}</label>
			<p className={classes.Error}>{error === '' ? <br/> : error}</p>
		</div>		
	);
}

export default Input;




/* import React from 'react';
import classes from './InputField.module.scss'

const InputField = props => {
	if(!props.id) throw new Error(`"id" attribute is Required.`)
	if(!props.name) throw new Error(`"name" attribute is Required.`)
	let attr = props.attr
	let type = props.type
	let div = props.div
	let label = props.label
	let error = props.error
	if( (typeof attr) !== (typeof {}) ) attr = {}
	if( (typeof type) !== (typeof '') ) type = 'text'
	if( (typeof div) !== (typeof {}) ) div = {}
	if( (typeof label) !== (typeof '') ){
		label = null
	}
	label = <label for={props.id}>{label}</label>
	if( (typeof error) !== (typeof '') || error === '' ){
		error = <br/>
	}
	error = <p className={classes.Error}>{error}</p>
	console.log(props)
	return (
		<div className={classes.InputField} {...div}>
			<input
				id={props.id}
				type={type}
				{...attr}
				onChange={props.onChange}
				/>
			{label}
			{error}
		</div>		
	);
}

export default InputField; */