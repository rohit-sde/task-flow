import * as constants from './../actions/constants'

const initialState = {
	loadApp: false,
	isLoggedIn: false,
	accessToken: null,
	refreshToken: null
}
// const login = (state, action) => {
// 	console.log("LOGIN - OK!")
// 	return state
// }

// const updateLoadApp = (state, action) => {
// 	console.log('[AuthReducer] updateLoadApp')
// 	return {
// 		...state,
// 		loadApp: action.loadApp
// 	}
// }

// const updateLoggedIn = (state, action) => {
// 	console.log('[AuthReducer] updateLoggedIn')
// 	return {
// 		...state,
// 		isLoggedIn: action.isLoggedIn
// 	}
// }

// const refreshToken = (state, action) => {
// 	return {
// 		...state,
// 		accessToken: action.accessToken,
// 		refreshToken: action.refreshToken,
// 	}
// }

// const updateAuth = (state, action) => {
// 	return {
// 		...state,
// 		...action.payload
// 	}
// }


const authReducer = (state = initialState, action) => {
	switch (action.type) {
		// case constants.LOGIN: return login(state, action)
		// case constants.UPDATE_LOGGED_IN: return updateLoggedIn(state, action)
		// case constants.REFRESH_TOKEN: return refreshToken(state, action)
		// case constants.UPDATE_LOAD_APP: return updateLoadApp(state, action)
		case constants.UPDATE_AUTH: return {
			...state,
			...action.payload
		}
		default: return state
	}
}

export default authReducer