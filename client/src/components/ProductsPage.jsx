import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const ProductsPage = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:4000/produits");
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error.message);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div>
			<h2>Products</h2>
			<Link to="/products/add">Add Product</Link>
			<Link to="/products/order">Order products</Link>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product._id}>
							<td>{product.nom}</td>
							<td>{product.description}</td>
							<td>{product.prix}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Logout />
		</div>
	);
};

export default ProductsPage;
