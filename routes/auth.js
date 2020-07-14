const router = require('express').Router()
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
	// Validate we get from user
	const { error } = registerValidation(req.body)

	if (error) return res.status(400).send(error.details[0].message)

	// check if user already exists in db
	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist) return res.status(400).send('Email already exists')

	// Hash user password
	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	// Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	})

	try {
		const savedUser = await user.save()
		res.send({ user: user._id })
	} catch (err) {
		res.status(400).send(err)
	}
})

// Log In Functionality
router.post('/login', async (req, res) => {
	// Validating user log in credentials
	const { error } = loginValidation(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// Checking if email exists
	const user = await User.findOne({ email: req.body.email })
	if (!user) return res.status(400).send('Email not found')

	// Check if password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if (!validPassword) return res.status(400).send('Password is wrong')
	res.send('Logged In')
})

module.exports = router
