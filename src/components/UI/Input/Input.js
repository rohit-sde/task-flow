import React, {forwardRef, useState} from 'react';
import classes from './Input.module.scss'

const Input = (props, refObj) => {
	// console.log(refObj)
	/* 
		attr = {id, name}
	*/
	// console.log(props)
	let initialValue = (props.attr.value && typeof props.attr.value === typeof '') ? props.attr.value : ''
	const [value, setValue] = useState( initialValue )
	const [error, setError] = useState( '' )
	let attr = ( (typeof props.attr) === (typeof {}) ) ? props.attr : {}
	let div = ( (typeof props.div) === (typeof {}) ) ? props.div : {}
	let onChangeArgs = ( (typeof attr.args_on_change) === (typeof []) ) ? attr.args_on_change : []
	// console.log(onChangeArgs)

	if(typeof props.setValue === typeof (()=>{})){
		props.setValue(setValue)
	}

	let newAttr = {}
	for (const key in attr) {
		if (key !== 'args_on_change' && key !== 'value') {
			newAttr[key] = attr[key]
		}
	}
	attr = newAttr

	const inputRef = {}
	if(props.refSet && refObj.current[props.refSet]){
		inputRef.ref = refObj.current[props.refSet]
	}

	let classNames = [classes.Input]
	if(value !== '') classNames.push(classes.HideLabel)
	return (
		<div id={`${props.attr.id}_div`} className={classNames.join(' ')} {...div}>
			<input
				value={value}
				{...attr}
				{...inputRef}
				onChange={
					(e) => {
						if( (typeof props.attr.onChange) === typeof (()=>{}) ){
							// console.log(onChangeArgs)
							props.attr.onChange.call(null, e, setValue, setError, ...onChangeArgs)
						}
						else{
							setValue(e.target.value)
						}
					}
				}
				
				/>
			<label htmlFor={props.attr.id}>{props.label}</label>
			<p className={classes.Error}>{error === '' ? <br/> : error}</p>
		</div>		
	);
}

export default forwardRef(Input)