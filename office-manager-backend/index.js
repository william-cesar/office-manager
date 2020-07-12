const express = require('express')
const db = require('./src/models')

const server = express()
const port = 3001

const profilesRoutes = require('./src/routes/profilesRoutes')
const positionsRoutes = require('./src/routes/positionsRoutes')
const usersRoutes = require('./src/routes/usersRoutes')

server.get('/', (req, res) => {
	res.json({ message: 'Home route' })
})

server.use('/', profilesRoutes)

server.use('/', positionsRoutes)

server.use('/', usersRoutes)

db.sequelize.sync().then(() => {
	server.listen(port, () => {
		console.log(`Listening on port: ${port}`)
	})
})
