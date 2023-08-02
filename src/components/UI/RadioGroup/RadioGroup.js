import React, { useEffect, useRef, useState } from 'react'
import classes from './RadioGroup.module.scss'

const RadioGroup = props => {
	let data = [
		{label: 'Button 1', name: 'button', value: 'button1'},	// "id" attribute is optional 
		{label: 'Button 1', name: 'button', value: 'button2'}
	]
	if(typeof props.data === typeof []){
		if(props.data.length > 1)
			data = props.data
		else throw new Error('At two data items are required radio button.')
		if(props.value === undefined){
			throw new Error('"value" is required.')
		}
	}
	const valueIS = props.value === undefined ? 'button1' : props.value
	const valueHST = useState(valueIS)
	const [value, setValue] = valueHST

	const ref = useRef(null)

	useEffect(() => {
		props.stateObj.priority = {
			value: value,
			more: {
				valueIS,
				valueHST,
				ref,
				data
			}
		}
		// console.log('[DateTimePicker] useEffect "[]"')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		props.stateObj.priority.value = value
		// console.log('[DateTimePicker] useEffect "[value]"')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	let onChangeFun = e => {
		// console.log(e.target.value)
		setValue(e.target.value)
		// props.stateObj.priority.value = e.target.value
	}
	
	// Setting up data
	data.forEach( (v, i) => {
		data[i].id = `radio_${data[i].name}_${i}`
	})

	return (
		<div className={classes.RadioGroup}>
			<label>{props.label}</label><br/>
			<div className={classes.Button}>
				{ data.map( (v, i) => {
					return (
						<div key={v.id}>
							<input type="radio" name={v.name} id={v.id} value={v.value} checked={v.value === value} onChange={onChangeFun}/>
							<label htmlFor={v.id}>{v.label}</label>
						</div>
					)
 				})}
			</div>
		</div>
	)
}

export default RadioGroup