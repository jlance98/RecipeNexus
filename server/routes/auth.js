// Imports
const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

// Controller functions
router.post("/signup", authController.postSignup);
router.post("/login", authController.postLogin);

module.exports = router;
