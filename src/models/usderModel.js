const mongoose = require('mongoose')

const userModel = mongoose.Schema({
	username: { type: String, require: true },
	email: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	pic: {
		type: String,
		default: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"
	}
}, {
	timestamps: true
})

const user = mongoose.model("user", userModel)
module.exports = user