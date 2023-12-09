// Imports
const { Router } = require("express");
const recipeController = require("../controllers/recipeController");

const router = Router();

// Controller functions
router.post("/create", authController.postSignup);

module.exports = router;
