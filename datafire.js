const admin = require('firebase-admin');
const serviceAccount = require('./config/cafefronts-80027eb0fc77.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cafefronts.firebaseio.com'
});
const database = admin.database();
const photoRef = database.ref('photos');

const savePhoto = (photo) => {
  return photosRef.child(photo.id).set(photo, (error) => {
    if (error) {
      return console.log(`Data could not be saved because ${error}`);
    }
    console.log(`Photo ${photo.location.title} saved to firebase`);
  });
};

module.exports = {
  database,
  savePhoto,
}
