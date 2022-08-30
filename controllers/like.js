// Importation du model de base de donnée
const userSchema = require("../models/User");

exports.likeThing = (req, res, next) => {
    // Mettre un _ à l'id et aller chercher le produit dans la base de donnée
    userSchema.findOne({ _id: req.params.id })
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((error) => res.status(404).json({ error }));

    // Like +1 

}