import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("userToken");
		navigate("/");
	};

	return (
		<div className="mt-4">
			<button
				onClick={handleLogout}
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Logout
			</button>
		</div>
	);
};

export default Logout;
