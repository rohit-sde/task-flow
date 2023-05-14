export const isStringMatched = (regex, string, exactMatch = false) => {
	const match = regex.test(string)
	return match ? ( exactMatch ? match.length === string.length : true ) : false
}