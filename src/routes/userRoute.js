const express = require('express')
const { signin, signup, allUsers } = require('../controller/userController')
const auth = require('../middleware/auth')
const userRouter = express.Router()
userRouter
	.route("/signup")
	.post(signup)
	.get(auth, allUsers)
userRouter
	.route("/signin")
	.post(signin)

module.exports = userRouter