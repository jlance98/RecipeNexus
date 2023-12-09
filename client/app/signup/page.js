"use client";

import React from "react";
import "./page.module.css";
import { useState } from "react";

const signup = () => {
	const [email, setEmail] = useState("a@gmail.com");
	const [password, setPassword] = useState("password");

	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handleSubmit = async (e) => {
		setEmailError("");
		setPasswordError("");
		e.preventDefault();
		const user = { email, password };

		try {
			const res = await fetch("http://localhost:4000/signup", {
				method: "POST",
				credentials: "include",
				body: JSON.stringify({ email, password }),
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: "true",
			});
			const data = await res.json();
			console.log(data);
			if (data.errors) {
				setEmailError(data.errors.email);
				setPasswordError(data.errors.password);
			}
			if (data.user) {
				location.assign("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h2>Create an Account</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Email address</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
					<p className="email error">{emailError}</p>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<p className="password error">{passwordError}</p>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default signup;
