"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./page.module.css";

const create = () => {
	const [ingredients, setIngredients] = useState([
		{
			name: "",
			amount: 0,
			measurement: "",
		},
	]);

	const [steps, setSteps] = useState([
		{
			order: 1,
			instruction: "",
		},
	]);

	const [recipe, setRecipe] = useState({
		name: "",
		description: "",
	});

	useEffect(() => {
		console.log("Recipe state updated:", recipe);
	}, [recipe]); // This useEffect runs whenever `recipe` changes

	useEffect(() => {
		console.log("Ingredient state updated:", ingredients);
	}, [ingredients]); // This useEffect runs whenever `recipe` changes

	useEffect(() => {
		console.log("Step state updated:", steps);
	}, [steps]); // This useEffect runs whenever `step` changes

	const addIngredientField = () => {
		setIngredients([
			...ingredients,
			{
				name: "",
				amount: 0,
				measurement: "",
			},
		]);
	};

	const removeIngredientField = (indexToRemove) => {
		if (ingredients.length > 1) {
			setIngredients((prevFields) => {
				const updatedFields = prevFields.filter(
					(field, index) => index !== indexToRemove
				);
				return updatedFields;
			});
		}
	};

	const addStepField = () => {
		setSteps([
			...steps,
			{
				order: steps.length + 1,
				instruction: "",
			},
		]);
	};

	const removeStepField = (indexToRemove) => {
		if (steps.length > 1) {
			setSteps((prevSteps) => {
				const updatedSteps = prevSteps.filter(
					(step, index) => index !== indexToRemove
				);

				// Update order values for remaining steps
				const updatedStepsWithOrder = updatedSteps.map((step, index) => ({
					...step,
					order: index + 1,
				}));

				return updatedStepsWithOrder;
			});
		}
	};

	const submitRecipe = () => {};

	return (
		<div className={styles.view}>
			<h1>Create a Recipe</h1>

			<div>
				<h2>Recipe Information</h2>
				<div className={styles.recipeFields}>
					<label>Recipe Title</label>
					<input
						type="text"
						className="form-control"
						placeholder="Give your recipe a delectable name!"
						value={recipe.name}
						onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
					></input>
				</div>

				<div className={styles.recipeFields}>
					<label>Enter a description for your recipe:</label>
					<textarea
						className="form-control"
						rows="3"
						placeholder="Describe your recipe to entice your readers to try it out!"
						value={recipe.description}
						onChange={(e) =>
							setRecipe({ ...recipe, description: e.target.value })
						}
					></textarea>
				</div>
			</div>

			<div>
				<h2>Ingredients Information</h2>
				<div className="row">
					<div className="form-group col-md-3">
						<label>Ingredient</label>
					</div>
					<div className="form-group col-md-2">
						<label>Quantity</label>
					</div>
					<div className="form-group col-md-3">
						<label>Unit of Measurement</label>
					</div>
				</div>
				{ingredients.map((ingredient, index) => (
					<div key={ingredient.order} className="row ingredient-row">
						<div className="form-group col-md-3">
							<input
								type="text"
								className="form-control"
								value={ingredient.name}
								onChange={(e) => {
									const newIngredients = [...ingredients];
									newIngredients[index].name = e.target.value;
									setIngredients(newIngredients);
								}}
							/>
						</div>
						<div className="form-group col-md-2">
							<input
								type="number"
								className="form-control"
								value={ingredient.amount}
								onChange={(e) => {
									const newIngredients = [...ingredients];
									newIngredients[index].amount = e.target.value;
									setIngredients(newIngredients);
								}}
							/>
						</div>
						<div className="form-group col-md-3">
							<input
								type="text"
								className="form-control"
								value={ingredient.measurement}
								onChange={(e) => {
									const newIngredients = [...ingredients];
									newIngredients[index].measurement = e.target.value;
									setIngredients(newIngredients);
								}}
							/>
						</div>
						<div className="container-small form-group col-md-3 rmv-btn">
							<button
								onClick={() => removeIngredientField(index)}
								className="btn btn-danger"
							>
								Remove Ingredient
							</button>
						</div>
					</div>
				))}
				<button
					onClick={addIngredientField}
					className="btn btn-success btn-med add-btn"
				>
					Add an ingredient
				</button>
			</div>

			<div>
				<h2>Steps Information</h2>
				{steps.map((step, index) => (
					<div key={index} className="row ingredient-row">
						<div className="form-control">
							<label>Step {index + 1}</label>
							<textarea
								className="form-control"
								rows="3"
								placeholder="Describe your step here."
								value={step.instruction}
								onChange={(e) => {
									const newSteps = [...steps];
									newSteps[index].instruction = e.target.value;
									setSteps(newSteps);
								}}
							></textarea>
							<div className="container-small form-group col-md-3 rmv-btn mt-2">
								<button
									onClick={() => removeStepField(index)}
									className="btn btn-danger"
								>
									Remove step
								</button>
							</div>
						</div>
					</div>
				))}
				<button
					onClick={addStepField}
					className="btn btn-success btn-med add-btn"
				>
					Add an step
				</button>
			</div>

			<button
				onClick={submitRecipe}
				className="btn btn-success btn-med add-btn"
			>
				Submit recipe
			</button>
		</div>
	);
};

export default create;
