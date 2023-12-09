const mongoose = require("mongoose")

const commandeSchema = new mongoose.Schema({
    produits: {
        type: [String],
    },
    email_utilisateur: {
        type: String,
        required: true
    },
    prix_total: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("Commande", commandeSchema)