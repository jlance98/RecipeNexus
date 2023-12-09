// Imports
const User = require("../models/User");
const Fridge = require("../models/Fridge");
const bcrypt = require("bcrypt");

// POST /signup
const postCreate = async (req, res) => {
	const { email, password } = req.body;
	try {
		console.log(req);
		res.status(200).json({ fridge, user });
	} catch (err) {
		res.status(400).json({ err });
	}
};

module.exports = { postSignup };
