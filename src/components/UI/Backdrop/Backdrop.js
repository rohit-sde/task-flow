import React from 'react'
import classes from './Backdrop.module.scss'
import * as actions from './../../../store/actions/index'
import {connect} from 'react-redux'

const Backdrop = props => {

	const style = {}

	if(props.top) style.top = props.top

	return (
		<div className={classes.Backdrop} data-divname="backdrop" onClick={clickHandler.bind(null, props.updateBackdrop)}>
			<div style={style}>
				{props.data}
			</div>
		</div>
	)
}

const clickHandler = (updateBackdrop, e) => {
	if(e.target.dataset.divname === 'backdrop'){
		updateBackdrop({
			show: false,
			data: null
		})
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateBackdrop: (...args) => dispatch( actions.updateBackdrop(...args) )
	}
}

export default connect(null, mapDispatchToProps)(Backdrop)