const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please enter a recipe title."],
	},
	description: {
		type: String,
		required: [true, "Please provide a description for the recipe."],
	},
	steps: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Step",
		},
	],
	ingredients: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Ingredient",
		},
	],
});

module.exports = mongoose.model("Recipe", recipeSchema);
