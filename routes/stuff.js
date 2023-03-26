const express = require('express')
const stuffCtrl = require('./../controllers/stuff');

// on défini router a partir de la méthode Router de express
const router = express.Router();

// on ne met pas de '()' a createThing car on n'appel pas la fonction mais on l'applique a la route.
router.post('/', stuffCtrl.createThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);
router.get('/:id', stuffCtrl.getOneThing);
router.get('/', stuffCtrl.getAllThings);

module.exports = router;