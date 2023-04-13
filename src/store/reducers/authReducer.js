import * as constants from './../actions/constants'

const initialState = {
	isLoggedIn: false
}
const login = (state, action) => {
	console.log("LOGIN - OK!")
	return state
}

const updateLoggedIn = (state, action) => {
	console.log('[AuthReducer] updateLoggedIn')
	console.log(action)
	return {
		...state,
		isLoggedIn: action.isLoggedIn
	}
}



const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.LOGIN: return login(state, action)
		case constants.UPDATE_LOGGED_IN: return updateLoggedIn(state, action)
		default: return state
	}
}

export default authReducer