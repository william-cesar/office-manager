const express = require('express')

const router = express.Router()

router.get('/users/test', (req, res) => {
	res.json({ message: 'Users route' })
})

module.exports = router
