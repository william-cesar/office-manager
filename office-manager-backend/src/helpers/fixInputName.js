const fixInputName = (name) => {
	if (name == '') {
		return false
	}
	const removeSpaces = name.trim()
	const fixedName = removeSpaces.charAt(0).toUpperCase() + removeSpaces.slice(1)

	return fixedName
}

module.exports = fixInputName
