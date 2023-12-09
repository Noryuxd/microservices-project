import { useRef, useState } from "react";
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
		<div>
			<h2>Register</h2>
			<form onSubmit={handleRegister}>
				<div>
					<label>Name:</label>
					<input type="text" ref={nameRef} required />
				</div>
				<div>
					<label>Email:</label>
					<input type="email" ref={emailRef} required />
				</div>
				<div>
					<label>Password:</label>
					<input type="password" ref={passwordRef} required />
				</div>
				<div>
					<button type="submit">Register</button>
					<p>
						Already have an account? <Link to="/">Login here</Link>.
					</p>
				</div>
			</form>
			{message === undefined ? (
				<p style={{ color: "green" }}>Utilisateur entregistré avec success</p>
			) : (
				<p style={{ color: "red" }}>{message}</p>
			)}
		</div>
	);
};

export default RegisterPage;
