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
		<div className="container mx-auto p-8">
			<h2 className="text-2xl font-bold mb-4">Products</h2>
			<div className="mb-4">
				<Link
					to="/products/add"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Add Product
				</Link>
				<Link
					to="/products/order"
					className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Order products
				</Link>
			</div>
			<table className="table-auto w-full">
				<thead>
					<tr>
						<th className="border px-4 py-2">Name</th>
						<th className="border px-4 py-2">Description</th>
						<th className="border px-4 py-2">Price</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product._id}>
							<td className="border px-4 py-2">{product.nom}</td>
							<td className="border px-4 py-2">{product.description}</td>
							<td className="border px-4 py-2">{product.prix}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Logout />
		</div>
	);
};

export default ProductsPage;
