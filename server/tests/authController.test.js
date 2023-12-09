const { postSignup, postLogin } = require("../controllers/authController");
const User = require("../models/User");
const Fridge = require("../models/Fridge");
const bcrypt = require("bcrypt");

jest.mock("../models/User");
jest.mock("../models/Fridge");

describe("POST /signup", () => {
	it("should create a new user and fridge, then return them in the response with a 200 status code", async () => {
		// Arrange
		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash("testpassword", salt);
		const mockUser = new User({
			email: "test@example.com",
			password: hashPassword,
		});
		const mockFridge = new Fridge({
			ingredients: [],
		});
		User.create.mockResolvedValue(mockUser);
		Fridge.create.mockResolvedValue(mockFridge);
		const req = {
			body: {
				email: "test@example.com",
				password: "testpassword",
			},
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		// Act
		await postSignup(req, res);

		// Assert
		expect(User.create).toHaveBeenCalledWith({
			email: "test@example.com",
			password: hashPassword,
		});
		expect(Fridge.create).toHaveBeenCalledWith({
			ingredients: [],
		});
		expect(mockUser.fridge).toBe(mockFridge._id);
		expect(mockUser.save).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			fridge: mockFridge,
			user: mockUser,
		});
	});
	it("should handle errors, then return an error message in the response with a 400 status code", async () => {
		// Arrange
		const errorMessage = "Some error occured";
		User.create.mockRejectedValue(new Error(errorMessage));
		const test = new Error(errorMessage);
		const req = {
			body: {
				email: "test@example.com",
				password: "testpassword",
			},
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		// Action
		await postSignup(req, res);

		// Assert
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			err: new Error(errorMessage),
		});
	});
});

describe("POST /login", () => {
	it("should verify user credentials, then return user id in the response with a 200 status code", async () => {
		// Arrange
		const mockUser = new User({
			email: "test@example.com",
			password: "testpassword",
		});
		User.findOne.mockResolvedValue(mockUser);
		bcrypt.compare.mockResolvedValue(true);
		const req = {
			email: "test@example.com",
			password: "testpassword",
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		// Action
		await postLogin(req, res);

		// Assert
		expect(mockUser.findOne).toHaveBeenCalledWith({
			email: "test@example.com",
		});
	});
	it("should catch incorrect passwords, then return an error message in the response with a 400 status code", () => {});
	it("should catch unregistered emails, then return an error message in the response with a 400 status code", () => {});
});
