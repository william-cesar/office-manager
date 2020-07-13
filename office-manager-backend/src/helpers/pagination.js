const pagination = (page, limit, offset) => {
	const itemsPerPage = limit ? limit : 5
	const initialItem = offset ? offset : (page - 1) * itemsPerPage
	return initialItem
}

module.exports = pagination
