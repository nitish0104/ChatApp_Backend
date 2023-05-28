const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
	try {
		let token = req?.headers?.authorization
		console.log(token)
		if (token) {
			const user = jwt.verify(token?.split(" ")[1], process.env.SECRET_KEY)
			req['userId'] = user.id;
			next();
		}
		else {
			console.log("no toekn")
			return res.status(401).json({ message: "unauthorized user" })
		}
	} catch (error) {
		console.log(error);
		res.status(401).json({ message: "unauthorized user" })


	}
}
module.exports = auth;