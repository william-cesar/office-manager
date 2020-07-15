module.exports = (str) => {
	if (str == '') {
		return false
	}
	const removeSpaces = str.trim()
	const standardString =
		removeSpaces.charAt(0).toUpperCase() + removeSpaces.slice(1)

	return standardString
}
