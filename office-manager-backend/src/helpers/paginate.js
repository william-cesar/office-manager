module.exports = (page, limit, offset) => {
	const itemsPerPage = limit ? limit : 5
	const paginate = offset ? offset : (page - 1) * itemsPerPage
	return paginate
}
