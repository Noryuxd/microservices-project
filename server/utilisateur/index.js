console.clear();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Utilisateur = require("./Utilisateur");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("dotenv").config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
	`mongodb+srv://${username}:${password}@cluster0.lpidaoh.mongodb.net/microservice_project?retryWrites=true&w=majority`
);

app.post("/auth/register", async (req, res) => {
	let { nom, email, password } = req.body;
	const userExists = await Utilisateur.findOne({ email });
	if (userExists) {
		return res.json({ message: "Cet utilisateur existe déjà" });
	} else {
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				return res.status(500).json({ error: err });
			} else {
				password = hash;
				const newUtilisateur = new Utilisateur({ nom, email, password });
				newUtilisateur
					.save()
					.then((user) => {
						res.status(201).json(user);
						console.log("Utilisateur enregistré avec success");
					})
					.catch((error) => res.status(400).json({ error }));
			}
		});
	}
});

app.post("/auth/login", async (req, res) => {
	const { email, password } = req.body;
	const utilisateur = await Utilisateur.findOne({ email });
	if (!utilisateur) {
		return res.json({ message: "Utilisateur introuvable" });
	} else {
		bcrypt.compare(password, utilisateur.password).then((resultat) => {
			if (!resultat) {
				return res.json({ message: "Mot de passe incorrect" });
			} else {
				const payload = { email, nom: utilisateur.nom };
				jwt.sign(payload, "secret", (err, token) => {
					if (err) console.log(err);
					else return res.json({ token: token });
				});
			}
		});
	}
});

app.listen(4002, () => {
	console.log("http://localhost:4002/");
});
