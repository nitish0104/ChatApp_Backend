const userModel = require('../models/usderModel')
const asyncHandler = require("express-async-handler");

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const user = require('../models/usderModel');
dotenv.config()
const allUsers = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
			$or: [
				{ name: { $regex: req.query.search, $options: "i" } },
				{ email: { $regex: req.query.search, $options: "i" } },
			],
		}
		: {};

	const users = await user.find(keyword).find({ _id: { $ne: req.userId } });
	// const users = await user.find(keyword);
	res.send(users);
});

const signup = async (req, res) => {

	const { name, email, password } = req.body
	console.log(req.body);
	console.log(name);
	try {
		//existing user
		const existinguser = await userModel.findOne({ email: email })
		if (existinguser) {
			return res.status(400).json({ message: "user already exist" })
		}
		//hashed password
		const hashpassword = await bcrypt.hash(password, 10)
		//userCreation
		const result = await userModel.create({
			name: name,
			email: email,
			password: hashpassword,
		})
		//token
		const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, {
			expiresIn: "10d"
		})
		res.status(201).json({ user: result, token: token, _id: result._id, })
		console.log(result._id);
		console.log(token.id);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "something went wrong" })
	}
}
const signin = async (req, res) => {
	const { email, password } = req.body
	try {
		const existinguser = await userModel.findOne({ email: email })
		if (!existinguser) {
			return res.status(404).json({ message: "user not found" })
		}

		const matchpassword = await bcrypt.compare(password, existinguser.password)
		if (!matchpassword) {
			return res.status(400).json({ message: "invalid credentials" })
		}

		const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.SECRET_KEY)
		res.status(201).json({ user: existinguser, token: token })


	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "something went wrong" })
	}
}

module.exports = { allUsers, signin, signup }