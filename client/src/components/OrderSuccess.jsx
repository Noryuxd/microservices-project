import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const OrderSuccess = () => {
	return (
		<div>
			<h2>Order Placed Successfully!</h2>
			<p>
				Your order has been successfully placed. Thank you for shopping with us!
			</p>
			<Link to="/products">Continue Shopping</Link>
			<Logout />
		</div>
	);
};

export default OrderSuccess;
