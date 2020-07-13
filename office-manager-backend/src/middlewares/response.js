const statusCodeOK = 200
const statusCodeBadRequest = 400
const statusCodeNotFound = 404
const statusCodeServerError = 500

const jsonOK = function (data, message) {
	message = message ? message : 'Successful request'

	this.status(statusCodeOK)

	return this.json({ message, data, status: statusCodeOK })
}

const jsonBadRequest = function (data, message) {
	message = message ? message : 'Bad request'

	this.status(statusCodeBadRequest)

	return this.json({ message, data, status: statusCodeBadRequest })
}

const jsonNotFound = function (data, message) {
	message = message ? message : 'Not found'

	this.status(statusCodeNotFound)

	return this.json({ message, data, status: statusCodeNotFound })
}

const jsonServerError = function (data, message) {
	message = message ? message : 'Server Error'

	this.status(statusCodeServerError)

	return this.json({ message, data, status: statusCodeServerError })
}

const response = (req, res, next) => {
	res.jsonOK = jsonOK
	res.jsonBadRequest = jsonBadRequest
	res.jsonNotFound = jsonNotFound
	res.jsonServerError = jsonServerError

	next()
}

module.exports = response
