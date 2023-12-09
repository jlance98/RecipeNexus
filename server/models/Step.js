const mongoose = require("mongoose");

const stepSchema = mongoose.Schema({
	order: {
		type: Number,
		required: true,
	},
	instruction: {
		type: String,
		required: [true, "Please enter step instructions."],
	},
});

module.exports = mongoose.model("Step", stepSchema);
