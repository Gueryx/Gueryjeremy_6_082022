// Importation du model de base de donnée
const User = require("../models/Thing");

exports.likeThing = (req, res, next) => {
    // Mettre un _ à l'id et aller chercher le produit dans la base de donnée
    User.findOne({ _id: req.params.id })
        .then((objet) => {
            // Si le usersLiked est False et si le like est de 1 alors ...
            if (!objet.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                User.updateOne({ _id: req.params.id }, {
                        // Like +1
                        $inc: { like: 1 },
                        // Push l'id de la personne qui a aimé dans usersLiked
                        $push: { usersLiked: req.body.userId }
                    })
                    .then(() => res.status(201).json({ message: "La personne aime +1" }))
                    .catch((error) => res.status(400).json({ error }));
            };
            // Pour enlever son +1 et revenir au neutre
            if (objet.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                User.updateOne({ _id: req.params.id }, {
                        // Like à 0
                        $inc: { like: -1 },
                        // Pull enlever l'id de l'usersLiked
                        $pull: { usersLiked: req.body.userId }
                    })
                    .then(() => res.status(201).json({ message: "La personne aime à 0" }))
                    .catch((error) => res.status(400).json({ error }));
            };
        })
        .catch((error) => res.status(404).json({ error }));
}