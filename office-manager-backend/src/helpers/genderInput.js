const genderInput = (gender) => {
	const format = gender.toString().trim()
	const firstLetterOnly = format.slice(0, 1).toUpperCase()

	if (firstLetterOnly == 'M' || firstLetterOnly == 'F') {
		return firstLetterOnly
	} else {
		return 'undefined'
	}
}

module.exports = genderInput
