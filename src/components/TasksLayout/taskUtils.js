export const addBRTag = data => {
	return (data !== '') ? data.replace(/\r\n/g, '<br/>').replace(/\r|\n/g, '<br/>') : ''
}

export const removeBRTag = data => {
	return (data !== '') ? data.replace(/<br\/>/g, '\n') : ''
}

export const trimStart = data => {
	return data.replace(/^([(\n|\r\n|\r)\s]+)/g, '')
}

export const trimEnd = data => {
	return data.replace(/([(\n|\r\n|\r)\s]+)$/g, '')
}