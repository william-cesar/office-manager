const express = require('express')

const server = express()
const port = 3001

server.use('/', (req, res) => {
	res.json({ message: 'Test route is working' })
})

server.listen(port, () => {
	console.log('API is working')
})
