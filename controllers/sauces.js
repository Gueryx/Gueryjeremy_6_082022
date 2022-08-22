const sauce = require('../models/Thing');

// Creation d'un produit
exports.createThing = (req, res) => {
    // Retire le champ _id généré par mongoDB avant de copier l'objet
    delete req.body._id;
    const sauce = new Thing({
        // Récupération des informations
        ...req.body
    });
    // Enregistrer l'objet dans la base de donnée
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'un produit
exports.modifyThing = (req, res) => {
    Thing.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié.' }))
        .catch(error => res.status(400).json({ error }));
};

// Supression d'un produit
exports.deleteThing = (req, res) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé.' }))
        .catch(error => res.status(400).json({ error }));
};

// Un produit en particulier
exports.getOneThing = (req, res) => {
    Thing.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Tout les produits
exports.getAllThings = (req, res) => {
    Thing.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};