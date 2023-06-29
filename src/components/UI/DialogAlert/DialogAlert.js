import React from 'react';
import classes from './DialogAlert.module.scss'
import { IconContext } from 'react-icons'
import { BsXSquare } from 'react-icons/bs'
import * as actions from './../../../store/actions/index'
import {connect} from 'react-redux'

const DialogAlert = props => {

	const title = props.title !== undefined ? props.title : 'Confirm'
	const body = props.body !== undefined ? props.body : 'Are you sure?'
	const textSuccess = props.textSuccess !== undefined ? props.textSuccess : 'OK'
	const textFail = props.textFail !== undefined ? props.textFail : 'CANCEL'
	const cbSuccess = props.cbSuccess !== undefined ? props.cbSuccess : cbFailHandler.bind(null, props.updateBackdrop)
	const cbFail = props.cbFail !== undefined ? props.cbFail : cbFailHandler.bind(null, props.updateBackdrop)

	return (
		<div className={classes.DialogAlert}>
			<div className={classes.Title}>
				<div>{title}</div>
				<div className={classes.Close} onClick={cbFail.bind(null, props.updateBackdrop)}>
					<IconContext.Provider value={{size: '1.5em' }}>
						<BsXSquare tabIndex="0"/>
					</IconContext.Provider>
				</div>
			</div>
			<div className={classes.Body}>
				{body}
			</div>
			<div className={classes.ButtonCon}>
				<div>
					<div>
						<button className={classes.Button} onClick={cbSuccess.bind(null, props.updateBackdrop)}>{textSuccess}</button>
					</div>
					<div>
						<button className={classes.Button} onClick={cbFail.bind(null, props.updateBackdrop)}>{textFail}</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const cbFailHandler = (updateBackdrop, e) => {
	updateBackdrop({
		show: false,
		data: null
	})
}

const mapDispatchToProps = dispatch => {
	return {
		updateBackdrop: (...args) => dispatch( actions.updateBackdrop(...args) ),
	}
}

export default connect(null, mapDispatchToProps)(DialogAlert)