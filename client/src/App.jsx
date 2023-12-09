import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProductsPage from "./components/ProductsPage";
import ProductsAddPage from "./components/ProductsAddPage";
import ProductsOrder from "./components/ProductsOrder";
import OrderSuccess from "./components/OrderSuccess";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/products/add" element={<ProductsAddPage />} />
				<Route path="/products/order" element={<ProductsOrder />} />
				<Route path="/order-success" element={<OrderSuccess />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</Router>
	);
};

export default App;
