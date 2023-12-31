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
			navigate("/products");
		} catch (error) {
			console.error("Error adding product:", error.message);
			messageRef.current.innerText =
				"An error occurred during product addition.";
		}
	};

	return (
		<div className="container mx-auto p-8">
			<h2 className="text-2xl font-bold mb-4">Add Product</h2>
			<form onSubmit={handleAddProduct} className="mb-4">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name:
					</label>
					<input
						type="text"
						required
						ref={productNameRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Description:
					</label>
					<input
						type="text"
						required
						ref={productDescriptionRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Price:
					</label>
					<input
						type="text"
						required
						ref={productPriceRef}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Add Product
					</button>
				</div>
			</form>
			<p ref={messageRef} className="text-red-500"></p>
		</div>
	);
};

export default ProductsAddPage;
