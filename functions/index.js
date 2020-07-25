const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid').v1;

admin.initializeApp(functions.config().firebase);

const handleHelloWorld = (request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
};

const handleCreateKey = (request, response) => {
    const newKey = uuid();
    const msgRoot = admin.database().ref('/boards/' + newKey);
    msgRoot.set({ created: Date.now() });
    response.status(200).send(newKey);
};

exports.helloWorld = functions.https.onRequest(handleHelloWorld);
exports.createKey = functions.https.onRequest(handleCreateKey);
