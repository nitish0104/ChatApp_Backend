const mongoose = require('mongoose')

const userModel = mongoose.Schema({
	name: { type: String, require: true },
	email: { type: String, require: true },
	password: { type: String, require: true },
	pic: {
		type: String, require: true,
		default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"
	}
}, {
	timeStamp: true
})

const user = mongoose.model("user", userModel)
module.exports = user