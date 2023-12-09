console.clear();
const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(
	"mongodb+srv://rabiiababsa10:A842HX8IXrHj6ZcS@cluster0.lpidaoh.mongodb.net/microservice_project?retryWrites=true&w=majority"
);
const Produit = require("./Produit");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello");
});

app.post("/produits/ajouter", async (req, res) => {
	const { nom, description, prix } = req.body;
	try {
		const newProduit = new Produit({
			nom,
			description,
			prix,
		});
		const resultat = await newProduit.save();
		res.status(201).send(resultat);
		console.log("Produit ajouté");
	} catch (e) {
		res.status(400).send(e.message);
	}
});

app.get("/produits", (req, res) => {
	Produit.find()
		.then((produits) => {
			res.json(produits);
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});

app.post("/produit/acheter", (req, res) => {
	const { ids } = req.body;
	Produit.find({ _id: { $in: ids } })
		.then((produits) => res.status(201).json(produits))
		.catch((error) => res.status(400).json({ error }));
});

app.listen(4000, () => {
	console.log("http://localhost:4000/");
});
