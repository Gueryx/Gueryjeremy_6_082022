// Connexions
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Créations de routes post pour les informations
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exporter le router
module.exports = router;