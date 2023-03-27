////////// IMPORT //////////

//Une application Express est fondamentalement une série de fonctions middleware.
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// importe notre modèle
const Product = require('./models/products');
// crée app comme une application express en utilisant la méthode express()
const appTest = express();

mongoose.connect('mongodb+srv://pierreprie:wJvpfwKZ7zN1zSGX@clusterppr.c8zypay.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie pour appTest!'))
  .catch(() => console.log('Connexion à MongoDB échouée pour appTest!'));

////////// MIDDLEWARE //////////
// au minimum le dernier objet de la chaine doit utiliser l'objet res pour renvoyer la réponse au client sinon la requete va expirer

//intercepte les requetes qui contiennent du json et mets a disposition ce contenue du corps de la requete dans l'objet request via 'req.body'
appTest.use(express.json());

//Pas d'addresse spécifié, donc appliqué a toute les routes
//La définition se fait sur l'objet réponse
appTest.use((req, res, next) => {
    //autorise l'accès a l'API depuis toute les origines
    res.setHeader('Access-Control-Allow-Origin', '*');
    //autorise certains headers sur les requêtes a notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //autorise certains méthodes sur les requêtes a notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Permet de récupérer le contenu json du body d'une requète
appTest.use(bodyParser.json());

// app.post intercepte uniquement les requetes POST
appTest.post('/api/products', (req, res, next) => {
  const product = new Product({
    //l'opérateur '...' spread permet de faire la correspondance automatique champ a champ
    ...req.body
  });
  //on sauvegarde l'objet dans la BDD. La méthode save() renvoie une Promise, on a donc un .then et un .error
  product.save()
    .then(() => res.status(201).json({product}))
    .catch((error) => res.status(400).json({error})); //{error} est équivalent a error: error
});

appTest.put('/api/products/:id', (req, res, next) => {
  //on fait la maj l'objet dans la BDD. La méthode updateOne() renvoie une Promise, on a donc un .then et un .error. On cherche l'objet ayant _id qui vaut req.params.id et on mes a jours l'objet (via spread du body + conserver _id original)
  Product.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Modified!'}))
    .catch((error) => res.status(400).json({error}));
});

//:id est dynamique
appTest.get('/api/products/:id', (req, res, next) => {
  // on recherche un objet thing en filtrant sur son paramètre _id, pour que celui-ci corresponde à req.params.id
  Product.findOne({ _id: req.params.id})
    .then(product => res.status(200).json({product}))
    .catch(error => res.status(404).json({error}));
});

//on spécifie en plus le chemin pour lequel la fonction Middleware est utilisé
// app.get intercepte uniquement les requetes GET
appTest.get('/api/products', (req, res, next) => {
  //on récupère la liste des objet de la BDD. La méthode find() renvoie une Promise, on a donc un .then et un .error
  Product.find()
    //Mongoose a crée une collection things associé a mon modèle Thing, je peux donc la récupérer
    .then(products => res.status(200).json({products}))
    .catch(error => res.status(400).json({error}));
});

appTest.delete('/api/products/:id', (req, res, next) => {
   //on fait la suppression de l'objet dans la BDD. La méthode deleteOne() renvoie une Promise, on a donc un .then et un .error. On cherche l'objet ayant _id qui vaut req.params.id
   Product.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Deleted!'}))
    .catch((error) => res.status(400).json({error}));
});

////////// EXPORT //////////
// permet d'exporter le module app que l'on a défini
module.exports = appTest;