const fixInputName = (name) => {
	const removeSpaces = name.trim()
	const fixedName = removeSpaces.charAt(0).toUpperCase() + removeSpaces.slice(1)

	return fixedName
}

module.exports = fixInputName
