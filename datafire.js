const admin = require('firebase-admin');
const serviceAccount = require('./config/cafefronts-80027eb0fc77.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cafefronts.firebaseio.com'
});

module.exports = admin.database();
