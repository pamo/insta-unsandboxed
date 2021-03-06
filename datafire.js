const admin = require('firebase-admin');
const serviceAccount = require('./config/cafefronts-80027eb0fc77.json');

const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cafefronts.firebaseio.com'
  });
  this.database = admin.database();
  return this.database;
};

const savePhoto = (photo) => {
  const database = this.database || initialize();
  return database.ref('photos').child(photo.id).set(photo, (error) => {
    if (error) {
      return console.log(`Data could not be saved because ${error}`);
    }
    console.log(`Photo ${photo.location.title} saved to firebase`);
  });
};

module.exports = {
  initialize,
  savePhoto
}
