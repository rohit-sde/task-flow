import React, { useEffect, useRef, useState } from 'react';
import classes from './Textarea.module.scss'

const Textarea = props => {
	const valueIS = props.value === undefined ? '' : props.value
	const valueHST = useState(valueIS)
	const [value, setValue] = valueHST
	let onChangeFun = e => {

		if(typeof props.evChange === typeof (()=>{}) ){
			props.evChange.bind(null, setHeight.bind(null, e.target))
		}
		else{
			setHeight(e.target)
			setValue(e.target.value)
		}
		props.stateObj[props.name].more.e = e

		const messageHST = props.stateObj.messageHST
		if(messageHST){
			if(messageHST[0].show === 1){
				messageHST[1]({show: 0, error: 0, text: ''})
			}
		}
	}
	const ref = useRef(null)

	useEffect(() => {
		// console.log('[Textarea] useEffect, [props.minRows]')
		setHeight(ref.current)
	}, [props.minRows])
	
	// Setting up data
	const textareaAttrDefault = {
		id: 'textarea_'+props.name,
		'data-minrows': (typeof props.minRows === typeof 0) ? props.minRows : 1
	}
	const textareaAttr = (typeof props.textarea === typeof {}) ? { ...textareaAttrDefault, ...props.textarea} : {...textareaAttrDefault}

	props.stateObj[props.name] = {
		value,
		more: {
			valueIS,
			valueHST,
			ref
		}
	}

	return (
		<div className={classes.Textarea}>
			<label htmlFor={textareaAttr.id}>{props.label}</label><br/>
			<textarea
				ref={ref}
				id=""
				value={value}
				{...textareaAttr}
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

export default Textarea