const { json } = require('body-parser');
const Thing = require('../models/Thing');
const sauce = require('../models/Thing');

// Creation d'un produit
exports.createThing = (req, res) => {
    // parsé l'objet
    const thingObject = JSON.parse(req.body.thing);
    // Id valide
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new sauce({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré.' }) })
        .catch(error => { res.status(400).json({ error }) });
};

// Modification d'un produit
exports.modifyThing = (req, res) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };

    // Mesure de sécurité, assignation de l'Id
    delete thingObject._userId;
    // Récupération du bon id et la vérifier
    Thing.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(400).json({ message: 'Non-autorisé.' });
            } else {
                Thing.updateOne({ _id: req.params.id }, {...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié.' }))
                    .catch((error) => req.status(401).json({ error }));
            }
        })
        .catch((error) => req.status(400).json({ error }));
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