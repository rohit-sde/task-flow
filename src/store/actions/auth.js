import * as constants from './constants'
import axios from './../../axios'

export const login = (e, emailRef, passRef, setLoginError) => {
	let email = emailRef.current.value
	let pass = passRef.current.value
	console.log(email, pass)
	e.preventDefault()
	return dispatch => {
		console.log(emailRef.current.dataset)
		console.log(passRef.current.dataset)
		console.dir(passRef.current.dataset)
		let sendLoginRequest = false;

		if(emailRef.current.dataset.checkValidation !== undefined && passRef.current.dataset.checkValidation !== undefined){
			if(emailRef.current.dataset.error === 'false' && passRef.current.dataset.error === 'false'){
				sendLoginRequest = true
			}
		}
		else{
			if(emailRef.current.dataset.checkValidation === undefined && passRef.current.dataset.checkValidation !== undefined){
				setLoginError({
					text: 'Email field is required.',
					show: 1,
					error: 1
				})
			}
			else if(emailRef.current.dataset.checkValidation !== undefined && passRef.current.dataset.checkValidation === undefined){
				setLoginError({
					text: 'Password field is required.',
					show: 1,
					error: 1
				})
			}
			else{
				setLoginError({
					text: 'Email & Password are required.',
					show: 1,
					error: 1
				})
			}
		}
		if( sendLoginRequest ){
			axios.post('/users/login', {
				userEmail: email,
				userPass: pass
			})
				.then(res => {
					if(res.data.status){
						let data = res.data.data
						console.log(data)
						setLoginError({
							text: 'Logged-in successfully.',
							show: 1,
							error: 0
						})
						setTimeout(() => {
							localStorage.setItem('task-cutive-token', data.refreshToken)
							dispatch({
								type: constants.UPDATE_AUTH,
								payload: {
									accessToken: data.accessToken,
									refreshToken: data.refreshToken,
									isLoggedIn: true,
									loadApp: true
								}
							})
						}, 1000)
					}
					else{
						let message = res.data.message
						if(message === 'Invalid Email/Password. [1]')
							// Invalid Email
							message = 'Invalid Email/Password.'
						else if(message === 'Invalid Email/Password. [3]')
							// Invalid Pass
							message = 'Invalid Email/Password.'
						else
							message = 'Something went wrong.'
						
						// console.log('[Login Error] - ' + res.data.message)
						setLoginError({
							text: message,
							show: 1,
							error: 1
						})
					}
				})
		}
	}
}
export const updateAuth = (payload) => {
	return {
		type: constants.UPDATE_AUTH,
		payload
	}
}
export const updateLoadApp = (loadApp = false) => {
	return {
		type: constants.UPDATE_AUTH,
		payload: {loadApp}
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