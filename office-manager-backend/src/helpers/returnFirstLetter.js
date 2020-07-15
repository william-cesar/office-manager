module.exports = (gender) => {
	const format = gender.toString().trim()
	const returnFirstLetter = format.slice(0, 1).toUpperCase()

	if (returnFirstLetter == 'M' || returnFirstLetter == 'F') {
		return returnFirstLetter
	} else {
		return 'undefined'
	}
}
