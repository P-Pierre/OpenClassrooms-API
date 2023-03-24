////////// IMPORT //////////

//Une application Express est fondamentalement une série de fonctions middleware.
const express = require('express');

// crée app comme une application express en utilisant la méthode express()
const app = express();

////////// MIDDLEWARE //////////

// utilise les objets 'req' : request et 'res' : response
// la fonction next permet de renvoyer a une prochaine fonction midlewear l'exécution du server
app.use((req,res, next) => {
    //Affiche un message dans la console 
    console.log('Requête recues !');
    //Appel la fonction next pour transmettre la requête à la prochaine fonction midlewear
    next();
});

app.use((req,res, next) => {
    //Modifie le status du message de réponse
    res.status(201);
    next();
});

app.use((req,res, next) => {
    //renvoyer une reponse en json
    res.json({message: 'Vore requête a bien été recue !'});
    next();
});

app.use((req,res, next) => {
    console.log('Reponse envoyé avec succes !');
    next();
});

////////// EXPORT //////////
// permet d'exporter le module app que l'on a défini
module.exports = app;