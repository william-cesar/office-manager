const express = require('express')
const { User, Position, Sequelize } = require('../models')
const returnFirstLetter = require('../helpers/returnFirstLetter')
const validateCPF = require('../helpers/validateCPF')
const paginate = require('../helpers/paginate')
const standardString = require('../helpers/standardString')
const validateDate = require('../helpers/validateDate')

const router = express.Router()

router.get('/active', async (req, res) => {
	const user = await User.findAndCountAll({
		where: {
			isActive: true,
		},
	})

	if (user != '') {
		return res.jsonOK(user)
	} else {
		return res.jsonNotFound(null)
	}
})

router.get('/active/:name/:order/:page', async (req, res) => {
	let first_name
	const { name } = req.params
	const { order } = req.params
	const { page } = req.params
	const limit = 5

	name == '*' ? (first_name = ' ') : (first_name = name)

	const user = await User.findAll({
		where: {
			first_name: {
				[Sequelize.Op.iLike]: `%${standardString(first_name)}%`,
			},
			isActive: true,
		},
		include: {
			model: Position,
			attributes: ['position_name'],
		},
		order: [['first_name', order]],
		limit,
		offset: paginate(page, limit),
	})

	if (user.count != 0) {
		return res.jsonOK(user)
	} else {
		return res.jsonNotFound(null)
	}
})

router.get('/inactive/:name/:order/:page', async (req, res) => {
	let first_name
	const { name } = req.params
	const { order } = req.params
	const { page } = req.params
	const limit = 5

	name == '*' ? (first_name = ' ') : (first_name = name)

	const user = await User.findAll({
		where: {
			first_name: {
				[Sequelize.Op.iLike]: `%${standardString(first_name)}%`,
			},
			isActive: false,
		},
		include: {
			model: Position,
			attributes: ['position_name'],
		},
		order: [['first_name', order]],
		limit,
		offset: paginate(page, limit),
	})

	if (user.count != 0) {
		return res.jsonOK(user)
	} else {
		return res.jsonNotFound(null)
	}
})

router.post('/', async (req, res) => {
	const { first_name } = req.body
	const { last_name } = req.body
	const { registration_doc } = req.body
	const { birthdate } = req.body
	const { gender } = req.body
	const { positionId } = req.body

	if (!validateCPF(registration_doc)) {
		return res.jsonBadRequest(null, 'CPF must be a valid number.')
	} else {
		const user = await User.findOne({
			where: { registration_doc: validateCPF(registration_doc) },
		})
		if (user) {
			return res.jsonBadRequest(null, 'User already exists.')
		}
	}

	if (!standardString(first_name) || !standardString(last_name)) {
		return res.jsonBadRequest(null, 'Name must not be empty.')
	}

	if (!positionId) {
		return res.jsonBadRequest(
			null,
			'User must be attached to an active Position.'
		)
	}

	const position = await Position.findOne({
		where: { id: positionId, isActive: true },
	})

	if (!position) {
		return res.jsonBadRequest(
			null,
			'User must be attached to an active Position.'
		)
	}

	if (validateDate(birthdate) == false) {
		return res.jsonBadRequest(
			null,
			"Birthdate must be in a valid format 'DD/MM/YYYY'."
		)
	}

	const newUser = await User.create({
		first_name: standardString(first_name),
		last_name: standardString(last_name),
		registration_doc: validateCPF(registration_doc),
		birthdate: validateDate(birthdate),
		gender: returnFirstLetter(gender),
		positionId,
	})

	return res.jsonOK(newUser)
})

router.put('/edit/:id', async (req, res) => {
	const { id } = req.params
	const { first_name } = req.body
	const { last_name } = req.body
	const { registration_doc } = req.body
	const { birthdate } = req.body
	const { gender } = req.body
	const { positionId } = req.body

	const user = await User.findOne({
		where: { id },
	})

	if (!user) {
		return res.jsonNotFound(null)
	}

	if (!standardString(first_name) || !standardString(last_name)) {
		return res.jsonBadRequest(null, 'Name must not be empty.')
	}

	if (!validateCPF(registration_doc)) {
		return res.jsonBadRequest(null, 'CPF must be a valid number.')
	}

	if (!positionId) {
		return res.jsonBadRequest(
			null,
			'User must be attached to an active Position.'
		)
	}

	if (validateDate(birthdate) == false) {
		return res.jsonBadRequest(
			null,
			"Birthdate must be in a valid format 'DD/MM/YYYY'."
		)
	}

	const position = await Position.findOne({
		where: { id: positionId, isActive: true },
	})

	if (!position) {
		return res.jsonBadRequest(
			null,
			'User must be attached to an active Position.'
		)
	}

	const updateUser = await User.update(
		{
			first_name: standardString(first_name),
			last_name: standardString(last_name),
			registration_doc: validateCPF(registration_doc),
			birthdate: validateDate(birthdate),
			gender: returnFirstLetter(gender),
			isActive: true,
			positionId,
		},
		{ where: { id } }
	)

	const updatedUser = await User.findOne({
		where: { id },
	})

	return res.jsonOK(updatedUser)
})

router.patch('/:id', async (req, res) => {
	const { id } = req.params

	const user = await User.findOne({ where: { id, isActive: true } })

	if (!user) {
		return res.jsonNotFound(null)
	}

	const updateUser = await User.update(
		{
			isActive: false,
		},
		{
			where: { id },
		}
	)
	return res.jsonOK(null, 'User deleted successfully')
})

module.exports = router
