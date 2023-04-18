import * as constants from './constants'
import axios from './../../axios'

export const login = (e, email, pass) => {
	e.preventDefault()
	return {
		type: constants.LOGIN,
		email,
		pass
	}
}
export const updateLoadApp = (loadApp) => {
	return {
		type: constants.UPDATE_LOAD_APP,
		loadApp
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
const refreshTokenAction = (accessToken, refreshToken) => {
	return {
		type: constants.REFRESH_TOKEN,
		accessToken,
		refreshToken
	}
}
export const refreshToken = (refreshToken, history) => {
	
	return dispatch => {
		try{
			axios.post('/users/refreshToken', {refreshToken} )
				.then(res => {
					if(res.data.status){
						let data = res.data.data
						const {accessToken, refreshToken} = data
						dispatch( refreshTokenAction(accessToken, refreshToken) )
						dispatch( updateLoggedIn(true, history) )
						dispatch( updateLoadApp(true) )
					}
					else{
						console.log("error")
					}
				})
		}
		catch(e){
			console.log('Axios error', e)
		}
	}

	// let accessToken = ''
	
	// // history
	// return {
	// 	type: constants.REFRESH_TOKEN,
	// 	accessToken,
	// 	refreshToken
	// }
}