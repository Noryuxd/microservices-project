import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userToken");
		navigate("/");
	};
	return (
		<div>
			<button onClick={handleLogout}> Logout</button>
		</div>
	);
};

export default Logout;
