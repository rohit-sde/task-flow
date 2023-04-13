import * as constants from './constants'

export const login = (e, email, pass) => {
	e.preventDefault()
	return {
		type: constants.LOGIN,
		email,
		pass
	}
}
export const updateLoggedIn = (isLoggedIn, histroy) => {
	if(histroy.location.pathname !== '/' && isLoggedIn){
		histroy.push('/')
	}
	return {
		type: constants.UPDATE_LOGGED_IN,
		isLoggedIn
	}
}