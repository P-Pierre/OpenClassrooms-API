////////// IMPORT //////////

//Une application Express est fondamentalement une série de fonctions middleware.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// importation de notre router 
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// crée app comme une application express en utilisant la méthode express()
const app = express();

mongoose.connect('mongodb+srv://pierreprie:wJvpfwKZ7zN1zSGX@clusterppr.c8zypay.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

////////// MIDDLEWARE //////////
// au minimum le dernier objet de la chaine doit utiliser l'objet res pour renvoyer la réponse au client sinon la requete va expirer

//intercepte les requetes qui contiennent du json et mets a disposition ce contenue du corps de la requete dans l'objet request via 'req.body'
app.use(express.json());

//Pas d'addresse spécifié, donc appliqué a toute les routes
//La définition se fait sur l'objet réponse
app.use((req, res, next) => {
    //autorise l'accès a l'API depuis toute les origines
    res.setHeader('Access-Control-Allow-Origin', '*');
    //autorise certains headers sur les requêtes a notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //autorise certains méthodes sur les requêtes a notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Permet de récupérer le contenu json du body d'une requète
app.use(bodyParser.json());

//Pour toutes les routes 'api/stuff' on utilise notre router stuffRoutes
app.use('/api/stuff', stuffRoutes);
//Pour toutes les routes 'api/auth' on utilise notre router userRoutes
app.use('/api/auth', userRoutes);

////////// EXPORT //////////
// permet d'exporter le module app que l'on a défini
module.exports = app;