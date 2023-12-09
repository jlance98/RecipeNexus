const mongoose = require("mongoose");

const fridgeSchema = mongoose.Schema({
	ingredients: [
		{
			name: {
				type: String,
				required: [true, "Please enter a name."],
			},
			amount: {
				type: String,
				required: [true, "Please enter an amount."],
			},
			measurement: {
				type: String,
				required: [true, "Please enter a measurement."],
			},
		},
	],
});

module.exports = mongoose.model("Fridge", fridgeSchema);
