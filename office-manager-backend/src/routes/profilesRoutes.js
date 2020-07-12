const express = require('express')

const router = express.Router()

router.get('/profiles/test', (req, res) => {
	res.json({ message: 'Profiles route' })
})

module.exports = router
