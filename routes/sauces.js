// Connexions
const express = require('express');
const router = express.Router();

// Importations
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Route Ctrl pour Post/Ajout une sauce 
router.post('/', auth, multer, saucesCtrl.createSauce);

// Route Ctrl pour Put pour la modification d'un produit
router.put('/:id', auth, multer, saucesCtrl.modifySauce);

// Route pour trouver un seul objet par son id
router.get('/:id', auth, saucesCtrl.getOneSauce);

// Route pour avoir tout les produits
router.get('/', auth, saucesCtrl.getAllSauce);

// Route pour la suppression d'un produit
router.delete('/:id', auth, saucesCtrl.deleteSauce);

// Route pour les liked un produit
router.post('/:id/like', auth, saucesCtrl.likeSauce);


module.exports = router;