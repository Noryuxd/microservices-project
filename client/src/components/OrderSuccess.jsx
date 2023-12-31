import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const OrderSuccess = () => {
	return (
		<div className="container mx-auto p-8 text-center">
			<h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
			<p className="mb-4">
				Your order has been successfully placed. Thank you for shopping with us!
			</p>
			<Link
				to="/products"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Products List
			</Link>
			<Logout />
		</div>
	);
};

export default OrderSuccess;
