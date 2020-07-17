module.exports = (value) => {
	var date = value
	var dateArr = new Array()
	var ExpReg = new RegExp(
		'(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}'
	)
	dateArr = date.split('/')
	err = false
	if (date.search(ExpReg) == -1) {
		err = true
	} else if (
		(dateArr[1] == 4 ||
			dateArr[1] == 6 ||
			dateArr[1] == 9 ||
			dateArr[1] == 11) &&
		dateArr[0] > 30
	)
		err = true
	else if (dateArr[1] == 2) {
		if (dateArr[0] > 28 && dateArr[2] % 4 != 0) err = true
		if (dateArr[0] > 29 && dateArr[2] % 4 == 0) err = true
	}
	if (err) {
		return false
	}
	const validDate = value
	return validDate
}
