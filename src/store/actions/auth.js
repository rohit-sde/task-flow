import * as constants from './constants'

export const login = (e, email, pass) => {
	e.preventDefault()
	return {
		type: constants.LOGIN,
		email,
		pass
	}
}