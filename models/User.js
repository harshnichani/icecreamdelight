const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Email validation
const validator = require("validator");

// Notes: required & unique to be true so that user cannot signup with same email ids.
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please enter a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please enter an password"],
		minlength: [8, "Minimum length is 8 Character"],
	},
});

// Hashing password using bcrypt and applying it using mongoose hooks
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("Incorrect Password");
	}
	throw Error("Email does not exist");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
