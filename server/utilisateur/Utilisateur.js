const mongoose = require("mongoose");

const UtilisateurSchema = mongoose.Schema({
  nom: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Utilisateur", UtilisateurSchema);
