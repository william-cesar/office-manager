const express = require('express')
const { Profile, Sequelize } = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
	const profile = await Profile.findAll()
	return res.jsonOK(profile)
})

router.get('/:name', async (req, res) => {
	const { name } = req.params

	const profile = await Profile.findAll({
		where: {
			profile_name: {
				[Sequelize.Op.iLike]: `%${name}%`,
			},
		},
	})

	if (profile != '') {
		return res.jsonOK(profile)
	} else {
		return res.jsonNotFound(null)
	}
})

router.post('/', async (req, res) => {
	const { profile_name } = req.body
	const removeSpaces = profile_name.trim()
	const profileName =
		removeSpaces.charAt(0).toUpperCase() + removeSpaces.slice(1)

	const profile = await Profile.findOne({
		where: { profile_name: profileName },
	})
	if (profile) {
		return res.jsonBadRequest(null, 'Profile already exists.')
	}

	const newProfile = await Profile.create({ profile_name })

	return res.jsonOK(newProfile)
})

router.put('/:id', async (req, res) => {
	const { id } = req.params
	const { profile_name } = req.body

	const removeSpaces = profile_name.trim()
	const profileName =
		removeSpaces.charAt(0).toUpperCase() + removeSpaces.slice(1)

	const profile = await Profile.findOne({ where: { id } })

	if (!profile) {
		return res.jsonNotFound(null)
	}

	const updateProfile = await Profile.update(
		{ profile_name: profileName },
		{ where: { id } }
	)
	const updatedProfile = await Profile.findOne({ where: { id } })

	return res.jsonOK(updatedProfile)
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params

	const profile = await Profile.findOne({ where: { id } })

	if (!profile) {
		return res.jsonNotFound(null)
	}

	const deleteProfile = await Profile.destroy({ where: { id } })
	return res.jsonOK(null, 'Profile deleted successfully')
})

module.exports = router
