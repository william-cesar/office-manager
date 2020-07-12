const express = require('express')

const router = express.Router()

router.get('/positions/test', (req, res) => {
	res.json({ message: 'Positions route' })
})

module.exports = router
