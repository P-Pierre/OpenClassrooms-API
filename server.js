const http = require('http');
const app = require('./app');
//const appTest = require('./appTest');

/*
 * const nomFontion = (param1, param2) ou param => {
 *    if(){
 *       return uneValeurType1;
 *    }else{
 *       return uneValeurType2;
 *    }
 * };
 */

// fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
    // parse val selon une base 10 decimale
    const port = parseInt(val,10);

    // test si le parse de val a bien abouti a un nombre
    if (isNaN(port)){
        return val;
    }
    // retourne le port si celui ci est positif
    if (port >= 0) {
        return port;
    }
    // retourne false dans les autres cas
    return false;
};

const port = normalizePort(process.env.PORT||3000);

/*
* app.set(name, value)
* Définie name avec la valeur
*/ 
app.set('port',port);
//appTest.set('port',port);

// fonction de gestion des erreurs
const errorHandler = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }
    const address = server.address();
    const bind = (typeof address === 'string') ? 'pipe ' + address : 'port: ' + port;
    switch(error.code){
        case 'EACCES':
            console.error(bind + 'requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
        default:
            throw error;
    }
};

/*
* l'objet/fonction app est défini pour répondre aux requètes recus par le serveur
*/
const server = http.createServer(app);
//const server = http.createServer(appTest);

// associe le fonction errorHandler à l'evenement 'error'
server.on('error',errorHandler);
// associe la fonction crée sur place a l'evenement 'listenning'
server.on('listening', () => {
    const address = server.address();
    const bind = (typeof address === 'string') ? 'pipe ' + address : 'port: ' + port;
    console.log('Listenning on ' + bind);
});

server.listen(port);