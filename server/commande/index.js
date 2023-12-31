console.clear();
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
	`mongodb+srv://${username}:${password}@cluster0.lpidaoh.mongodb.net/microservice_project?retryWrites=true&w=majority`
);

const Commande = require("./Commande");
const isAuthenticated = require("./isAuthenticated");

const axios = require("axios");

app.use(express.json());
app.use(cors());

function prixTotal(produits) {
	let total = 0;
	for (let t = 0; t < produits.length; ++t) {
		total += produits[t].prix;
	}
	return total;
}

async function httpRequest(ids) {
	const url = "http://localhost:4000/produit/acheter";
	try {
		const response = await axios.post(url, { ids });
		return prixTotal(response.data);
	} catch (error) {
		throw error;
	}
}

app.post("/commande/ajouter", isAuthenticated, async (req, res) => {
	try {
		const { ids } = req.body;
		const prix_total = await httpRequest(ids);
		const newCommande = new Commande({
			produits: ids,
			email_utilisateur: req.user.email,
			prix_total,
		});
		newCommande
			.save()
			.then((commande) => res.status(201).json(commande))
			.catch((error) => res.status(400).json({ error }));
		console.log("Commande ajouté");
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen("4001", () => {
	console.log("http://localhost:4001/");
});
