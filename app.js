const express = require('express');
const mongoose = require('mongoose');

// Importations
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

app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé'
    });
    next();
});

app.get((req, res, next) => {
    //Connexion pour tout le monde
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Autorisation pour certains en-tête
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Formes de requête possible
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Création d'article de sauce
app.use((req, res, next) => {
    const sauces = [{
        _id: 'SauceSpéciale',
        title: 'La première sauce',
        description: 'Les infos de la sauce en question',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 600,
        userId: 'Toto',
    }];
    res.status(200).json(sauces);
    next();
});

// Enregistrement des routes
app.use('/api/auth', userRoutes);

// Exporter cette application
module.exports = app;