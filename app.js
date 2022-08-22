// Connexions
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const path = require('path');

// Importations
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Création application express
const app = express();

// Capture tout ce qui est en .json
app.use(express.json());

// Connexion à mongoDB
mongoose.connect("mongodb+srv://Guery:pass123@cluster0.ir7i7su.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Les autorisations de application
app.use((req, res, next) => {
    //Connexion pour tout le monde
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Autorisation pour certains en-tête
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Formes de requête possible
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Enregistrement des routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exporter cette application
module.exports = app;