import * as constants from './constants'
import axios from './../../axios'
import store from './../store'

export const login = (e, emailRef, passRef, setLoginError, history, loginData) => {
	e.preventDefault()
	const [ , setLogin] = loginData
	let email = emailRef.current.value
	let pass = passRef.current.value
	
	return (dispatch, getState) => {
		const state = getState()
		let sendLoginRequest = false;

		if(emailRef.current.dataset.checkValidation !== undefined && passRef.current.dataset.checkValidation !== undefined){
			if(emailRef.current.dataset.error === 'false' && passRef.current.dataset.error === 'false'){
				sendLoginRequest = true
			}
		}
		else{
			if(email === '' && emailRef.current.dataset.checkValidation === undefined && passRef.current.dataset.checkValidation !== undefined){
				setLoginError({
					text: 'Email field is required.',
					show: 1,
					error: 1
				})
			}
			else if(pass === '' && emailRef.current.dataset.checkValidation !== undefined && passRef.current.dataset.checkValidation === undefined){
				setLoginError({
					text: 'Password field is required.',
					show: 1,
					error: 1
				})
			}
			else{
				if(email !== '' && pass !== ''){
					sendLoginRequest = true
				}
				else{
					setLoginError({
						text: 'Email & Password are required.',
						show: 1,
						error: 1
					})
				}
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
						// console.log('response')
						// console.log(data)
						setLoginError({
							text: 'Logged-in successfully.',
							show: 1,
							error: 0
						})

						setTimeout(() => {
							const payload = {
								user: {
									...state.auth.user,
									...data.user
								}
							}
							
							if(data.user.verified){
								payload.accessToken = data.token.accessToken
								payload.refreshToken = data.token.refreshToken
								payload.isLoggedIn = true
							}
							
							if(data.user.verified){
								localStorage.setItem('task-cutive-token', data.token.refreshToken)
								dispatch({
									type: constants.UPDATE_AUTH,
									payload: payload
								})	
							}
							else{
								dispatch({
									type: constants.UPDATE_AUTH,
									payload: payload
								})
								setLogin({email: email, pass: pass, from: 'login', otpSent: false, otpResend: false})
								history.push('/verifyEmail')
							}

						}, 1000)
					}
					else{
						let message = res.data.message
						if(message === 'Invalid Email/Password. [1]')
							// Invalid Email
							message = `Account doesn't exists. Signup first`
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
// export const refreshToken = () => new Promise( (resolve, reject) => {
// 	console.log(store)
// })
// 	let token = localStorage.getItem('task-cutive-token')
	
// 	if(token){
// 		return dispatch => {
// 			try{
// 				axios.post( process.env.REACT_APP_API_HOST_BASE + 'users/refreshToken', {refreshToken: token} )
// 				.then(res => {
// 					if(res.data.status){
// 						let data = res.data.data
// 						const {accessToken, refreshToken} = data
						
// 						dispatch( updateAuth({
// 							accessToken,
// 							refreshToken
// 						}) )
// 					}
// 					else{
// 						console.log("Refresh ...")
// 					}
// 				})
// 			}
// 			catch(e){
// 				console.log('Axios error', e)
// 			}
// 		}
// 	}
// 	else{
// 		console.log('login first')
// 	}
// }
export const signUp = (data, formReset, setMessage, history, loginData) => {
	/* 
		data = {fname: ..., lname: ..., email: ..., pass: ..., sendOTP: ...}
	*/

	const sendData = {
		...data,
		sendOTP: true
	}
	return dispatch => {
		try{
			axios.post('/users', sendData )
				.then(res => {
					console.log(res)
					if(res.data.status){
						setMessage({
							text: 'You have successfully Signed-Up.',
							show: 1,
							error: 0
						})
						formReset()
						
						let data = res.data.data
						
						const {_id, fname, lname, email, role, verified, verifyMeta} = data
						
						const [ , setLogin] = loginData;
						setLogin({email: sendData.email, pass: sendData.pass, from: 'signup', otpSent: true, otpResend: false})
						
						dispatch( updateAuth({
							user: {_id, fname, lname, email, role, verified, verifyMeta}
						}) )
						setTimeout( () => {
							history.push('/verifyEmail')
						}, 1000)
					}
					else{
						if( (/Email already exists./).test(res.data.message) ){
							setMessage({
								text: 'Email already exists.',
								show: 1,
								error: 1
							})
						}
						else{
							console.log("Signup ...")
						}
					}
				})
		}
		catch(e){
			console.log('Axios error', e)
		}
	}
}
/* 

{
    "status": 1,
    "data": {
        "_id": "616ead0ae38a32262f9d619c",
        "fname": "Test Fname",
        "lname": "Lname",
        "email": "demo@gmail.com",
        "role": "user",
        "verified": false,
        "created_at": "2021-10-19T11:33:30.120Z",
        "updated_at": "2021-10-19T11:33:30.120Z"
    },
    "message": "User created successfully."
}

*/