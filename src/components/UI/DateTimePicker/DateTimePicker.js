import React, { useEffect, useRef, useState } from 'react';
import classes from './DateTimePicker.module.scss'

const DateTimePicker = props => {
	let d = (new Date()).getTime()
	d += 24 * 60 * 60 * 1000
	d = (new Date(d)).toISOString()
	const valueIS = props.value === undefined ? d : props.value
	const valueHST = useState(valueIS)
	const [value, setValue] = valueHST

	const ref = useRef(null)

	useEffect(() => {
		props.stateObj.DataTime = {
			value: value,
			more: {
				valueIS,
				valueHST,
				ref
			}
		}
		console.log('[DateTimePicker] useEffect "[]"')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		props.stateObj.DataTime.value = value
		console.log('[DateTimePicker] useEffect "[value]"')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	let onChangeFun = e => {
		console.log(e)
		// if(typeof props.evChange === typeof (()=>{}) ){
		// 	props.evChange.bind(null, setHeight.bind(null, e.target))
		// }
		// else{
		// 	setHeight(e.target)
		// 	setValue(e.target.value)
		// }
		// props.stateObj[props.name].more.e = e

		// const messageHST = props.stateObj.messageHST
		// if(messageHST){
		// 	if(messageHST[0].show === 1){
		// 		messageHST[1]({show: 0, error: 0, text: ''})
		// 	}
		// }
	}
	

	// Setting up data
	const defaultAttr = {
		id: 'datetime_'+props.name
	}
	const attr = (typeof props.attr === typeof {}) ? { ...defaultAttr, ...props.attr} : {...defaultAttr}

	return (
		<div className={classes.DataTimePicker}>
			{value}
			<label htmlFor={attr.id}>{props.label}</label><br/>
			<textarea
				ref={ref}
				id=""
				value={value}
				{...attr}
				onChange={onChangeFun}
					></textarea>
		</div>
	)
}

const setHeight = ele => {
	// const ele = e.target
	const minrows = Number( ele.dataset.minrows )
	const oneRowHeight = 25

	let scroll = ele.scrollHeight
	const x = 4 - 0.8
	// console.log( getComputedStyle(ele).height )
	// console.log(scroll)
	ele.style.height = scroll + x + 'px'
	while(scroll !== ele.scrollHeight){
		// console.log(scroll)
		scroll = ele.scrollHeight
		ele.style.height = scroll + x + 'px'
	}
	if( Math.floor( (scroll + x) / oneRowHeight) < minrows ){
		ele.style.height = ( (scroll + x) % oneRowHeight ) + (oneRowHeight * minrows) + 'px'
	}
}

export default DateTimePicker