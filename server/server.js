// Imports
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const recipeRouts = require("./routes/recipe");

// Initialize Express app
const app = express();

// Middleware: configuring CORS
const corsOptions = {
	credentials: true,
	exposedHeaders: ["set-cookie"],
	origin: process.env.CLIENT_ADDRESS,
};
app.use(cors(corsOptions));

// Middleware: passing request body to request handler
app.use(express.json());

// Middleware: logging requests
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes for API endpoints
app.use("/", authRoutes);
app.use("/recipe", recipeRoutes);

// Connect to MongoDB database, then listen to specific port
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("MongoDB connection successful.");
			console.log("Server listening on port " + process.env.PORT + ".");
		});
	})
	.catch((err) => {
		console.log(err);
	});
