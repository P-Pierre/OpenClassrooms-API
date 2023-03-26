const mongoose = require('mongoose');

//creation d'un schéma de donnée en utilisant la methode Schema de mongoose
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},
});

//exportation de notre modèle. On défini son Nom et son Schéma
module.exports = mongoose.model('Things', thingSchema);