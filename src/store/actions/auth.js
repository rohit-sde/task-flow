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
export const updateAuth = (payload) => {
	return {
		type: constants.UPDATE_AUTH,
		payload
	}
}
export const updateLoadApp = (loadApp) => {
	return {
		type: constants.UPDATE_LOAD_APP,
		loadApp
	}
}
export const updateLoggedIn = (isLoggedIn, history) => {
	if(history.location.pathname !== '/' && isLoggedIn){
		history.push('/')
	}
	return {
		type: constants.UPDATE_AUTH,
		payload: {
			isLoggedIn: true
		}
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
						/* 
						console.log(0)
						dispatch( refreshTokenAction(accessToken, refreshToken) )
						console.log(1)
						dispatch( updateLoadApp(true) )
						console.log(2)
						dispatch( updateLoggedIn(true, history) )
						console.log(3)
						 */
						if(history.location.pathname !== '/'){
							history.push('/')
						}
						dispatch( updateAuth({
							accessToken,
							refreshToken,
							loadApp: true,
							isLoggedIn: true
						}) )
					}
					else{
						console.log("Refresh ...")
					}
				})
		}
		catch(e){
			console.log('Axios error', e)
		}
	}
}