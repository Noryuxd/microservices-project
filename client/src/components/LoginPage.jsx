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
		<div className="flex h-screen items-center justify-center">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleLogin}
			>
				<h2 className="text-2xl mb-4">Login</h2>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email:
					</label>
					<input
						ref={emailRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
						type="email"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password:
					</label>
					<input
						ref={passwordRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
						type="password"
					/>
				</div>
				<div className="mb-6">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Login
					</button>
					<p className="mt-2 text-sm">
						Don't have an account?{" "}
						<Link to="/register" className="text-blue-500">
							Register here
						</Link>
						.
					</p>
				</div>
				{message && <p style={{ color: "red" }}>{message}</p>}
			</form>
		</div>
	);
};

export default LoginPage;
