const express = require('express')
const { Position, Sequelize } = require('../models')
const pagination = require('../helpers/pagination')
const fixInputName = require('../helpers/fixInputName')

const router = express.Router()

router.get('/', async (req, res) => {
	const position = await Position.findAndCountAll({
		order: [['position_name', 'ASC']],
	})
	return res.jsonOK(position)
})

router.get('/:page', async (req, res) => {
	const { position_name } = req.body
	const { page } = req.params
	const limit = 5

	const position = await Position.findAndCountAll({
		where: {
			position_name: {
				[Sequelize.Op.iLike]: `%${fixInputName(position_name)}%`,
			},
		},
		order: [['position_name', 'ASC']],
		limit,
		offset: pagination(page),
	})

	if (position.count != 0) {
		return res.jsonOK(position)
	} else {
		return res.jsonNotFound(null)
	}
})

router.post('/', async (req, res) => {
	const { position_name } = req.body
	const { profileId } = req.body

	if (!fixInputName(position_name)) {
		return res.jsonBadRequest(null, 'Position name must not be empty.')
	}

	const position = await Position.findOne({
		where: { position_name: fixInputName(position_name) },
	})
	if (position) {
		return res.jsonBadRequest(null, 'Position already exists.')
	}

	const newPosition = await Position.create({
		position_name: fixInputName(position_name),
		profileId,
	})

	return res.jsonOK(newPosition)
})

router.put('/:id', async (req, res) => {
	const { id } = req.params
	const { position_name } = req.body
	const { profileId } = req.body

	const position = await Position.findOne({ where: { id } })

	if (!position) {
		return res.jsonNotFound(null)
	}

	if (!fixInputName(position_name)) {
		return res.jsonBadRequest(null, 'Position name must not be empty.')
	}

	const updatePosition = await Position.update(
		{ position_name: fixInputName(position_name), profileId },
		{ where: { id } }
	)
	const updatedPosition = await Position.findOne({ where: { id } })

	return res.jsonOK(updatedPosition)
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params

	const position = await Position.findOne({ where: { id } })

	if (!position) {
		return res.jsonNotFound(null)
	}

	const deletePosition = await Position.destroy({ where: { id } })
	return res.jsonOK(null, 'Position deleted successfully')
})

module.exports = router
