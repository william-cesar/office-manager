const express = require('express')
const db = require('./src/models')
const response = require('./src/middlewares/response')

const profilesRoutes = require('./src/routes/profilesRoutes')
const positionsRoutes = require('./src/routes/positionsRoutes')
const usersRoutes = require('./src/routes/usersRoutes')

const server = express()
const port = 3001

server.use(response)

server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use('/profiles', profilesRoutes)

server.use('/positions', positionsRoutes)

server.use('/users', usersRoutes)

server.get('/', (req, res) => {
	res.json({ message: 'Home route' })
})

db.sequelize.sync().then(() => {
	server.listen(port, () => {
		console.log(`Listening on port: ${port}`)
	})
})
