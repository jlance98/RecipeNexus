// Imports
const User = require("../models/User");
const Fridge = require("../models/Fridge");
const bcrypt = require("bcrypt");

// POST /signup
const postSignup = async (req, res) => {
	const { email, password } = req.body;
	try {
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(password, salt);
		const user = await User.create({ email, password: hashPassword });
		const fridge = await Fridge.create({ ingredients: [] });
		user.fridge = fridge._id;
		await user.save();
		// @TODO: Assign JWT token to user browser
		res.status(200).json({ fridge, user });
	} catch (err) {
		res.status(400).json({ err });
	}
};

// POST login
const postLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		// const user = await User.login(email, password);
		const user = await User.findOne({ email });
		if (user) {
			const auth = await bcrypt.compare(password, user.password);
			console.log(auth);
			if (auth) {
				res.status(200).json({ user: user._id });
				return;
			}
			throw Error("Incorrect password");
		}
		throw Error("Incorrect email");
	} catch (err) {
		console.log(err);
		res.status(400).json({ err });
	}
};

module.exports = { postSignup, postLogin };
