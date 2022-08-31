// Connexions
const express = require('express');
const router = express.Router();

// Importations
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Route Ctrl pour Post/Ajout une sauce 
router.post('/', auth, multer, saucesCtrl.createThing);

// Route Ctrl pour Put pour la modification d'un produit
router.put('/:id', auth, multer, saucesCtrl.modifyThing);

// Route pour trouver un seul objet par son id
router.get('/:id', auth, saucesCtrl.getOneThing);

// Route pour avoir tout les produits
router.get('/', auth, saucesCtrl.getAllThings);

// Route pour la suppression d'un produit
router.delete('/:id', auth, saucesCtrl.deleteThing);

// Route pour les liked un produit
router.post('/:id/like', auth, saucesCtrl.likeThing);


module.exports = router;