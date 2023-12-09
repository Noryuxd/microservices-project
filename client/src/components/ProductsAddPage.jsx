import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsAddPage = () => {
	const productNameRef = useRef(null);
	const productDescriptionRef = useRef(null);
	const productPriceRef = useRef(null);
	const messageRef = useRef(null);
	const navigate = useNavigate();

	const handleAddProduct = async (e) => {
		e.preventDefault();

		const productName = productNameRef.current.value;
		const productDescription = productDescriptionRef.current.value;
		const productPrice = productPriceRef.current.value;

		try {
			const response = await axios.post(
				"http://localhost:4000/produits/ajouter",
				{
					nom: productName,
					description: productDescription,
					prix: productPrice,
				}
			);

			messageRef.current.innerText = response.data.message;
			// Redirect to the products page after successful product addition
			navigate("/products")
		} catch (error) {
			console.error("Error adding product:", error.message);
			messageRef.current.innerText =
				"An error occurred during product addition.";
		}
	};

	return (
		<div>
			<h2>Add Product</h2>
			<form onSubmit={handleAddProduct}>
				<div>
					<label>Name:</label>
					<input type="text" required ref={productNameRef} />
				</div>
				<div>
					<label>Description:</label>
					<input type="text" required ref={productDescriptionRef} />
				</div>
				<div>
					<label>Price:</label>
					<input type="text" required ref={productPriceRef} />
				</div>
				<div>
					<button type="submit">Add Product</button>
				</div>
			</form>
			<p ref={messageRef}></p>
		</div>
	);
};

export default ProductsAddPage;
