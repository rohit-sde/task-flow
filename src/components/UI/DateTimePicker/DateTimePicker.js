import React, { useEffect, useRef, useState } from 'react'
import classes from './DateTimePicker.module.scss'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePickerMUI from '@mui/lab/DateTimePicker'

const DateTimePicker = props => {
	let d = (new Date()).getTime()
	d += 24 * 60 * 60 * 1000
	d = (new Date(d)).toISOString()
	const valueIS = props.value === undefined ? d : props.value
	const valueHST = useState(valueIS)
	const [value, setValue] = valueHST

	const ref = useRef(null)

	useEffect(() => {
		props.stateObj.dueDate = {
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
		props.stateObj.dueDate.value = (new Date(value) ).toISOString()
		console.log('[DateTimePicker] useEffect "[value]"')
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	let onChangeFun = newValue => {
		console.log(newValue)
		setValue(newValue)
	}
	

	// Setting up data
	const defaultAttr = {
		id: 'datetime_'+props.name
	}
	const attr = (typeof props.attr === typeof {}) ? { ...defaultAttr, ...props.attr} : {...defaultAttr}

	return (
		<div className={classes.DataTimePicker}>
			<label>{props.label}</label>
			<br/>
			<div className={classes.Style} {...attr}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateTimePickerMUI
						renderInput={(props) => <TextField {...props} />}
						// label={props.label}
						value={value}
						onChange={onChangeFun} />
				</LocalizationProvider>
			</div>
		</div>
	)
}

export default DateTimePicker