// Connexion au package de cryptage des mdp by bcrypt
const bcrypt = require('bcrypt');
// Connexion au package jsonwebtoken
const jwt = require('jsonwebtoken');

// Model User
const User = require('../models/User');

// Fonction signup pour l'enregistrement d'un nouveau utilisateur
exports.signup = (req, res) => {
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
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Identifiant/mot de passe incorrecte' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Identifiant/mot de passe incorrecte' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id },
                                    'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};