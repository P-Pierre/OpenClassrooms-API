// importe notre modèle
const Thing = require('./../models/things');

exports.createThing = (req, res, next) => {
    //Supprime la champ _id de la requète car il n'est pas utilisé dans la BDD
    delete req.body._id;
    const thing = new Thing({
      //l'opérateur '...' spread permet de faire la correspondance automatique champ a champ
      ...req.body
    });
    //on sauvegarde l'objet dans la BDD. La méthode save() renvoie une Promise, on a donc un .then et un .error
    thing.save()
    .then(() => res.status(201).json({ msessage: 'Objet enregistré !'}))
    .catch((error) => res.status(400).json({error})); //{error} est équivalent a error: error
};

exports.modifyThing = (req, res, next) => {
    //on fait la maj l'objet dans la BDD. La méthode updateOne() renvoie une Promise, on a donc un .then et un .error. On cherche l'objet ayant _id qui vaut req.params.id et on mes a jours l'objet (via spread du body + conserver _id original)
    Thing.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Objet modifié !'}))
    .catch((error) => res.status(400).json({error}));
};

exports.deleteThing = (req, res, next) => {
    //on fait la suppression de l'objet dans la BDD. La méthode deleteOne() renvoie une Promise, on a donc un .then et un .error. On cherche l'objet ayant _id qui vaut req.params.id
    Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({message: 'Objet supprimé !'}))
    .catch((error) => res.status(400).json({error}));
};

exports.getOneThing = (req, res, next) => {
    // on recherche un objet thing en filtrant sur son paramètre _id, pour que celui-ci corresponde à req.params.id
    Thing.findOne({ _id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({error}));
};

exports.getAllThings = (req, res, next) => {
    //on récupère la liste des objet de la BDD. La méthode find() renvoie une Promise, on a donc un .then et un .error
    Thing.find()
    //Mongoose a crée une collection things associé a mon modèle Thing, je peux donc la récupérer
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
};