////////// IMPORT //////////

//Une application Express est fondamentalement une série de fonctions middleware.
const express = require('express');

// crée app comme une application express en utilisant la méthode express()
const app = express();

////////// MIDDLEWARE //////////
// au minimum le dernier objet de la chaine doit utiliser l'objet res pour renvoyer la réponse au client sinon la requete va expirer

//intercepte les requetes qui contiennent du json et mets a disposition ce contenue du corps de la requete dans l'objet request via 'req.body'
app.use(express.json());

// utilise les objets 'req' : request et 'res' : response
// la fonction next permet de renvoyer a une prochaine fonction midlewear l'exécution du server
// app.use intercepte tout type de requete
app.use((req,res, next) => {
    //Affiche un message dans la console 
    console.log('Requête recues !');
    //Appel la fonction next pour transmettre la requête à la prochaine fonction midlewear
    next();
});

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

// app.post intercepte uniquement les requetes POST
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    //Modifie le status du message de réponse et l'objet json du message retourné
    res.status(201).json({message: 'Objet crée l'});
    next();
});


//on spécifie en plusle chemin pour lequel la fonction Middleware est utilisé
// app.get intercepte uniquement les requetes GET
app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];

    res.status(200).json(stuff);
    next();
  });

app.use((req,res, next) => {
    console.log('Reponse envoyé avec succes !');
    next();
});

////////// EXPORT //////////
// permet d'exporter le module app que l'on a défini
module.exports = app;