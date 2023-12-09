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
				return [
					...prevSelected,
					{ id: productId, quantity: 1, price: productPrice },
				];
			}
		});

		setTotalPrice((prevTotal) => prevTotal + productPrice);
	};

	const handleOrder = async (e) => {
		e.preventDefault();
		try {
			const authToken = localStorage.getItem("authToken");
			console.log(authToken);
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
			// Handle error, show a message, etc.
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
		<form onSubmit={handleOrder}>
			<div>
				<h2>Order Products</h2>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product.nom}</td>
								<td>${product.prix}</td>
								<td>
									<button
										type="button"
										onClick={() =>
											handleOrderButtonClick(product._id, product.prix)
										}
									>
										Order
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<p>Total Price: ${totalPrice.toFixed(2)}</p>

				<div>
					<h3>Selected Products</h3>
					<ul>
						{selectedProducts.map((product) => (
							<li key={product.id}>
								{product.quantity} x {product.id} - ${product.price}
								<button
									type="button"
									onClick={() => handleRemoveProduct(product.id, product.price)}
								>
									Remove
								</button>
							</li>
						))}
					</ul>
				</div>

				<button type="submit" disabled={selectedProducts.length === 0}>
					Place Order
				</button>
			</div>
			<Logout />
		</form>
	);
};

export default OrderProducts;
