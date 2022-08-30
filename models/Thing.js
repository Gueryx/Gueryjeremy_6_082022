// Connexion à mongoose
const mongoose = require('mongoose');

// Création d'un schéma de données
const thingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true, min: "1", max: "10" },
    likes: { type: Number, defaut: 0 },
    dislikes: { type: Number, defaut: 0 },
    usersLiked: { type: Array },
    usersDisliked: { type: Array },
});

//Exporter le model 
module.exports = mongoose.model('Thing', thingSchema);