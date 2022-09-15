// Importation du model "sauce"
const Sauce = require('../models/Sauce');

// “File System” Permet de créer, gérer ou supp' des fichiers pour stocker ou lire 
// des fichiers dans un programme Node
const fs = require('fs');

// Creation d'un produit
exports.createSauce = (req, res) => {
    // parsé l'objet
    const sauceObject = JSON.parse(req.body.sauce);
    // Id valide
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(sauce => res.status(201).json({ sauce }))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'un produit
exports.modifySauce = (req, res) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    // Mesure de sécurité, assignation de l'Id
    delete sauceObject._userId;
    // Récupération du bon id et la vérifier
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message: 'Unauthorized request' });
            } else {
                Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié.' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

// Supression d'un produit
exports.deleteSauce = (req, res) => {
    // Vérification des droits
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé.' });
            } else {
                const filename = sauce.imageUrl.split('/images')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet supprimé.' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};

// Un produit en particulier
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Tout les produits
exports.getAllSauce = (req, res) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// Liked / Disliked
// 3 conditions possible via le frontend: 0, 1 ou -1 de req.body.like
exports.likeSauce = (req, res) => {
    switch (req.body.like) {

        // Le cas où req.body.like = 0
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {

                    // On cherche si l'utilisateur est déjà dans le tableau usersLiked
                    if (sauce.usersLiked.find(user => user === req.body.userId)) {
                        // Si oui, on va mettre à jour la sauce avec le _id présent dans la requête
                        Sauce.updateOne({ _id: req.params.id }, {
                                // On décrémente la valeur des likes de 1 (soit -1)
                                $inc: { likes: -1 },
                                // Suppression de l'utilisateur dans le tableau
                                $pull: { usersLiked: req.body.userId }
                            })
                            .then(() => res.status(201).json({ message: "Vote OK." }))
                            .catch(error => res.status(400).json({ error }));
                    }

                    // Idem pour le tableau usersDisliked
                    if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId }
                            })
                            .then(() => res.status(201).json({ message: "Vote OK." }))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(404).json({ error }));
            break;

            // Le cas où req.body.like = 1
        case 1:
            // On va rechercher la sauce avec le _id présent dans la requête
            Sauce.updateOne({ _id: req.params.id }, {
                    // Changement de la valeur de likes par 1
                    $inc: { likes: 1 },
                    // On ajoute l'utilisateur dans le array usersLiked
                    $push: { usersLiked: req.body.userId }
                })
                .then(() => res.status(201).json({ message: "Vote OK." })) // Code 201: created
                .catch(error => res.status(400).json({ error })); // Code 400: bad request
            break;

            // le cas où req.body.like = -1
        case -1:
            Sauce.updateOne({ _id: req.params.id }, {
                    $inc: { dislikes: 1 },
                    $push: { usersDisliked: req.body.userId }
                })
                .then(() => res.status(201).json({ message: "Vote OK." }))
                .catch(error => res.status(400).json({ error }));
            break;
        default:
            console.log("bad request");
    }
};