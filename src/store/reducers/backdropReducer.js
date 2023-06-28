import * as constants from '../actions/constants'

const initialState = {
	show: false,
	data: null
}

const backdropReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.UPDATE_BACKDROP: return {
			...state,
			...action.payload
		}
		default: return state
	}
}

export default backdropReducer