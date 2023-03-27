const mongoose = require('mongoose');

//creation d'un schéma de donnée en utilisant la methode Schema de mongoose
const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    inStock: {type: Boolean, required: true},
});

//exportation de notre modèle. On défini son Nom et son Schéma
module.exports = mongoose.model('Product', productSchema);