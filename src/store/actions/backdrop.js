import * as constants from './constants'

export const updateBackdrop = (payload) => {
	return {
		type: constants.UPDATE_BACKDROP,
		payload
	}
}