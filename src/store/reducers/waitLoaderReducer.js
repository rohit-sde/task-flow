import * as constants from '../actions/constants'

const initialState = {
	show: false,
	message: ''
}

const waitLoaderReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.UPDATE_WAITLOADER: return {
			...initialState,
			...action.payload
		}
		default: return state
	}
}

export default waitLoaderReducer