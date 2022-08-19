// Connexions
const express = require('express');
const auth = require('auth');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllStuff);
router.post('/', auth, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);

module.exports = router;