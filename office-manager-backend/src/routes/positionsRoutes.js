const express = require('express')
const { Position, Profile, User, Sequelize } = require('../models')
const paginate = require('../helpers/paginate')
const standardString = require('../helpers/standardString')

const router = express.Router()

router.get('/active/:name/:order/:page', async (req, res) => {
	let position_name
	const { name } = req.params
	const { order } = req.params
	const { page } = req.params
	const limit = 5

	name == '*' ? (position_name = ' ') : (position_name = name)

	const position = await Position.findAndCountAll({
		where: {
			position_name: {
				[Sequelize.Op.iLike]: `%${standardString(position_name)}%`,
			},
			isActive: true,
		},
		order: [['position_name', order]],
		limit,
		offset: paginate(page, limit),
	})

	if (position.count != 0) {
		return res.jsonOK(position)
	} else {
		return res.jsonNotFound(null)
	}
})

router.get('/inactive/:name/:order/:page', async (req, res) => {
	let position_name
	const { name } = req.params
	const { order } = req.params
	const { page } = req.params
	const limit = 5

	name == '*' ? (position_name = ' ') : (position_name = name)

	const position = await Position.findAndCountAll({
		where: {
			position_name: {
				[Sequelize.Op.iLike]: `%${standardString(position_name)}%`,
			},
			isActive: false,
		},
		order: [['position_name', order]],
		limit,
		offset: paginate(page, limit),
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

	if (!standardString(position_name)) {
		return res.jsonBadRequest(null, 'Position name must not be empty.')
	}

	const position = await Position.findOne({
		where: { position_name: standardString(position_name) },
	})

	if (position) {
		return res.jsonBadRequest(null, 'Position already exists.')
	}

	if (!profileId) {
		return res.jsonBadRequest(
			null,
			'Position must be attached to an active Profile.'
		)
	}

	const profile = await Profile.findOne({
		where: { id: profileId, isActive: true },
	})

	if (!profile) {
		return res.jsonBadRequest(
			null,
			'Position must be attached to an active Profile.'
		)
	}

	const newPosition = await Position.create({
		position_name: standardString(position_name),
		profileId,
	})

	return res.jsonOK(newPosition)
})

router.put('/edit/:id', async (req, res) => {
	const { id } = req.params
	const { position_name } = req.body
	const { profileId } = req.body

	const position = await Position.findOne({ where: { id } })

	if (!position) {
		return res.jsonNotFound(null)
	}

	if (!standardString(position_name)) {
		return res.jsonBadRequest(null, 'Position name must not be empty.')
	}

	if (!profileId) {
		return res.jsonBadRequest(
			null,
			'Position must be attached to an active Profile.'
		)
	}

	const profile = await Profile.findOne({
		where: { id: profileId, isActive: true },
	})

	if (!profile) {
		return res.jsonBadRequest(
			null,
			'Position must be attached to an active Profile.'
		)
	}

	const updatePosition = await Position.update(
		{ position_name: standardString(position_name), isActive: true, profileId },
		{ where: { id } }
	)
	const updatedPosition = await Position.findOne({ where: { id } })

	return res.jsonOK(updatedPosition)
})

router.patch('/:id', async (req, res) => {
	const { id } = req.params

	const position = await Position.findOne({
		include: [{ model: User }],
		where: { id, isActive: true },
	})

	if (!position) {
		return res.jsonNotFound(null)
	}

	if (position) {
		const { Users } = position.dataValues

		let isNotEmpty = Users.filter((item) => {
			return item.dataValues.isActive == true
		})

		console.log(isNotEmpty)
		if (isNotEmpty != '') {
			return res.jsonBadRequest(
				null,
				'This position has at least one user attached to it.'
			)
		}
	}

	const setPositionInactive = await Position.update(
		{ isActive: false },
		{ where: { id } }
	)
	return res.jsonOK(null, 'Position deleted successfully')
})

module.exports = router
