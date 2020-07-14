const router = require('express').Router()
const userModel = require('../model/User')

router.post('/register', async (req, res) => {
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
