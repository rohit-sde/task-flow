import * as constants from './../actions/constants'

const initialState = {
	isLoggedIn: false
}
const login = (state, action) => {
	console.log("LOGIN - OK!")
	return state
}




const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case constants.LOGIN: return login(state, action)
		default: return state
	}
}

export default authReducer