const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please enter an email."],
		unique: [true, "Email is already registered."],
		lowercase: true,
		validate: [isEmail, "Please enter a valid email."],
	},
	password: {
		type: String,
		required: [true, "Please enter a password."],
		minlength: [5, "Password must be at least 5 characters."],
	},
	fridge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Fridge",
	},
});

module.exports = mongoose.model("User", userSchema);
