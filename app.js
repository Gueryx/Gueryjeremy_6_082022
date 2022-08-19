// Connexions
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

// Importations
const Thing = require('./models/Thing');
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

// Post/Ajout une sauce 
app.post('/api/sauces', auth, (req, res) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré' }))
        .catch(error => res.status(400).json({ error }));
});

// Création d'article de sauce
app.get('/api/sauces', auth, (req, res) => {
    const sauces = [{
        userId: 'Toto',
        name: 'SceDallas',
        manufacturer: 'Gueryx',
        description: 'Les infos de la sauce en question',
        mainPepper: 'Sel',
        imageUrl: 'https://i.ibb.co/dMVVsHY/t-l-chargement.jpg',
        heat: 6,
    }];
    res.status(200).json(sauces);
});

// Enregistrement des routes
app.use('/api/auth', userRoutes);

// Exporter cette application
module.exports = app;