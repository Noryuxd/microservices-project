import React, { useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		try {
			const response = await axios.post("http://localhost:4002/auth/register", {
				nom: name,
				email: email,
				password: password,
			});

			setMessage(response.data.message);
			if (!response.data.message !== undefined) {
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
		} catch (error) {
			console.error("Error during registration:", error.message);
			setMessage("An error occurred during registration.");
		}
	};

	return (
		<div className="flex h-screen items-center justify-center">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleRegister}
			>
				<h2 className="text-2xl mb-4">Register</h2>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name:
					</label>
					<input
						type="text"
						ref={nameRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email:
					</label>
					<input
						type="email"
						ref={emailRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Password:
					</label>
					<input
						type="password"
						ref={passwordRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-6">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Register
					</button>
					<p className="mt-2 text-sm">
						Already have an account?{" "}
						<Link to="/" className="text-blue-500">
							Login here
						</Link>
						.
					</p>
				</div>
				{message === undefined ? (
					<p className="text-green-500">User registered successfully</p>
				) : (
					<p className="text-red-500">{message}</p>
				)}
			</form>
		</div>
	);
};

export default RegisterPage;
