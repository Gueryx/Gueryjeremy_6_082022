// Connexions
const express = require('express');
const auth = require('auth');
const router = express.Router();

// Importations
const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllStuff);
router.post('/', auth, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.put('/:id', auth, saucesCtrl.modifyThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);

// Route Ctrl pour Post/Ajout une sauce 
router.post('/', auth, saucesCtrl.createThing);

// Route Ctrl pour Put pour la modification d'un produit
router.put('/:id', auth, saucesCtrl.modifyThing);

// Route pour trouver un seul objet par son id
router.get('/:id', saucesCtrl.getOneThing);

// Route pour avoir tout les produits
router.get('/', auth, saucesCtrl.getAllThings);

// Route pour la suppression d'un produit
router.delete('/:id', auth, saucesCtrl.deleteThing);


module.exports = router;