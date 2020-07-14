const router = require('express').Router()
const User = require('../model/User')
const { registerValidation } = require('../validation')

router.post('/register', async (req, res) => {
	// Validate we get from user
	const { error } = registerValidation(req.body)

	if (error) return res.status(400).send(error.details[0].message)

	// check if user already exists in db
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist) return res.status(400).send('Email already exists')

	// Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	})

	try {
		const savedUser = await user.save()
		res.send(savedUser)
	} catch (err) {
		res.status(400).send(err)
	}
})

module.exports = router
