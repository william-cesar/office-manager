const express = require('express')
const { Profile, Position, Sequelize } = require('../models')
const paginate = require('../helpers/paginate')
const standardString = require('../helpers/standardString')

const router = express.Router()

router.get('/active/:name/:order/:page', async (req, res) => {
	let profile_name
	const { name } = req.params
	const { order } = req.params
	const { page } = req.params
	const limit = 5

	name == '*' ? (profile_name = ' ') : (profile_name = name)

	const profile = await Profile.findAndCountAll({
		where: {
			profile_name: {
				[Sequelize.Op.iLike]: `%${standardString(profile_name)}%`,
			},
			isActive: true,
		},
		order: [['profile_name', order]],
		limit,
		offset: paginate(page, limit),
	})

	if (profile.count != 0) {
		return res.jsonOK(profile)
	} else {
		return res.jsonNotFound(null)
	}
})

router.get('/inactive/:name/:order/:page', async (req, res) => {
	let profile_name
	const { name } = req.params
	const { order } = req.params
	const { page } = req.params
	const limit = 5

	name == '*' ? (profile_name = ' ') : (profile_name = name)

	const profile = await Profile.findAndCountAll({
		where: {
			profile_name: {
				[Sequelize.Op.iLike]: `%${standardString(profile_name)}%`,
			},
			isActive: false,
		},
		order: [['profile_name', order]],
		limit,
		offset: paginate(page, limit),
	})

	if (profile.count != 0) {
		return res.jsonOK(profile)
	} else {
		return res.jsonNotFound(null)
	}
})

router.post('/', async (req, res) => {
	const { profile_name } = req.body

	if (!standardString(profile_name)) {
		return res.jsonBadRequest(null, 'Profile name must not be empty.')
	}

	const profile = await Profile.findOne({
		where: { profile_name: standardString(profile_name) },
	})
	if (profile) {
		return res.jsonBadRequest(null, 'Profile already exists.')
	}

	const newProfile = await Profile.create({
		profile_name: standardString(profile_name),
	})

	return res.jsonOK(newProfile)
})

router.put('/edit/:id', async (req, res) => {
	const { id } = req.params
	const { profile_name } = req.body

	const profile = await Profile.findOne({ where: { id } })

	if (!profile) {
		return res.jsonNotFound(null)
	}

	if (!standardString(profile_name)) {
		return res.jsonBadRequest(null, 'Profile name must not be empty.')
	}

	const updateProfile = await Profile.update(
		{ profile_name: standardString(profile_name), isActive: true },
		{ where: { id } }
	)
	const updatedProfile = await Profile.findOne({ where: { id } })

	return res.jsonOK(updatedProfile)
})

router.patch('/:id', async (req, res) => {
	const { id } = req.params

	const profile = await Profile.findOne({
		include: [{ model: Position }],
		where: { id, isActive: true },
	})

	if (!profile) {
		return res.jsonNotFound(null)
	}

	if (profile) {
		const { Positions } = profile.dataValues

		let isNotEmpty = Positions.filter((item) => {
			return item.dataValues.isActive == true
		})

		console.log(isNotEmpty)
		if (isNotEmpty != '') {
			return res.jsonBadRequest(
				null,
				'This profile has at least one position attached to it.'
			)
		}
	}

	const setProfileInactive = await Profile.update(
		{ isActive: false },
		{ where: { id } }
	)
	return res.jsonOK(null, 'Profile deleted successfully')
})

module.exports = router
