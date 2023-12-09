const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter a name."],
		lowercase: true,
	},
	amount: {
		type: String,
		required: [true, "Please enter an amount."],
	},
	measurement: {
		type: String,
		required: [true, "Please enter a measurement."],
	},
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
