import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		const emailValue = emailRef.current.value;
		const passwordValue = passwordRef.current.value;

		try {
			const response = await axios.post("http://localhost:4002/auth/login", {
				email: emailValue,
				password: passwordValue,
			});

			const token = response.data.token;
			console.log("Token:", token);
			console.log("Login Response:", response.data.message);
			if (response.data.message === undefined) {
				localStorage.setItem("authToken", token);
				navigate("/products");
			}
			setMessage(response.data.message);
		} catch (error) {
			console.error("Login Error:", error);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Login</h2>
			<div>
				<label>Email:</label>
				<input ref={emailRef} required type="email" />
			</div>
			<div>
				<label>Password:</label>
				<input ref={passwordRef} required type="password" />
			</div>
			<div>
				<button type="submit">Login</button>
				<p>
					Don't have an account? <Link to="/register">Register here</Link>.
				</p>
			</div>
			{message && <p style={{ color: "red" }}>{message}</p>}
		</form>
	);
};

export default LoginPage;
