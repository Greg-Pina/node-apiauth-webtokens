const router = require('express').Router()
const userModel = require('../model/User')

//Validation
const Joi = require('@hapi/joi')
const { Error } = require('mongoose')
const { ValidationError } = require('@hapi/joi')

const schema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required().email(),
})
router.post('/register', async (req, res) => {
	// Validate data before new user entry
	try {
		const error = Joi.assert(req.body, schema)
	} catch (err) {
		res.status(400).send(err.details[0].message)
	}
	const user = new userModel({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		date: req.body.date,
	})

	try {
		const savedUser = await user.save()
		res.send(savedUser)
	} catch (err) {
		res.status(400).send(err)
	}
})

module.exports = router
