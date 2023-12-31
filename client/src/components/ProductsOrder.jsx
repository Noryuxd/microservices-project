import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const OrderProducts = () => {
	const [products, setProducts] = useState([]);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const navigate = useNavigate();

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

	const handleOrderButtonClick = (productId, productPrice) => {
		setSelectedProducts((prevSelected) => {
			const isAlreadySelected = prevSelected.some(
				(item) => item.id === productId
			);

			if (isAlreadySelected) {
				return prevSelected.map((item) =>
					item.id === productId
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				const selectedProduct = products.find(
					(product) => product._id === productId
				);
				return [
					...prevSelected,
					{
						id: productId,
						quantity: 1,
						price: productPrice,
						name: selectedProduct.nom,
					},
				];
			}
		});

		setTotalPrice((prevTotal) => prevTotal + productPrice);
	};

	const handleOrder = async (e) => {
		e.preventDefault();
		try {
			const authToken = localStorage.getItem("authToken");
			await axios.post(
				"http://localhost:4001/commande/ajouter",
				{
					ids: selectedProducts.map((product) => product.id),
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			console.log("Order placed successfully");
			navigate("/order-success");
		} catch (error) {
			console.error("Error placing order:", error.message);
		}
	};

	const handleRemoveProduct = (productId, productPrice) => {
		setSelectedProducts((prevSelected) => {
			const updatedSelected = prevSelected
				.map((item) =>
					item.id === productId
						? { ...item, quantity: item.quantity - 1 }
						: item
				)
				.filter((item) => item.quantity > 0);

			setTotalPrice((prevTotal) => prevTotal - productPrice);
			return updatedSelected;
		});
	};

	return (
		<form onSubmit={handleOrder} className="container mx-auto p-8">
			<div>
				<h2 className="text-2xl font-bold mb-4">Order Products</h2>
				<table className="w-full mb-4">
					<thead>
						<tr>
							<th className="border px-4 py-2">Name</th>
							<th className="border px-4 py-2">Price</th>
							<th className="border px-4 py-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td className="border px-4 py-2">{product.nom}</td>
								<td className="border px-4 py-2">${product.prix}</td>
								<td className="border px-4 py-2">
									<button
										type="button"
										onClick={() =>
											handleOrderButtonClick(product._id, product.prix)
										}
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
									>
										Order
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<p className="mb-4">Total Price: ${totalPrice.toFixed(2)}</p>

				<div className="mb-4">
					<h3 className="text-lg font-bold">Selected Products</h3>
					<ul>
						{selectedProducts.map((product) => (
							<li key={product.id} className="mb-2">
								{product.quantity} x {product.name} - ${product.price}
								<button
									type="button"
									onClick={() => handleRemoveProduct(product.id, product.price)}
									className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
								>
									Remove
								</button>
							</li>
						))}
					</ul>
				</div>

				<button
					type="submit"
					disabled={selectedProducts.length === 0}
					className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
						selectedProducts.length === 0 ? "opacity-50 cursor-not-allowed" : ""
					} focus:outline-none focus:shadow-outline`}
				>
					Place Order
				</button>
			</div>
			<Logout />
		</form>
	);
};

export default OrderProducts;
