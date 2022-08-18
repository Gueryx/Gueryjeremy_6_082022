// Package de cryptage des mdp by bcrypt
const bcrypt = require('bcrypt');

// Model User
const User = require('../models/User');

// Fonction signup pour l'enregistrement d'un nouveau utilisateur
exports.signup = (req, res, next) => {
    //hachage du mdp
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Enregistrement de l'utilisateur dans la base de donée
            user.save()
                // Code 201 création de ressource
                .then(() => res.status(201).json({ message: 'Utilisateur créé.' }))
                // Erreur 500 c'est une erreur serveur
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction login pour connecter les utilisateurs existant
exports.login = (req, res, next) => {

};