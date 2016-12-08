const fs = require('fs');
const path = require('path');
const api = require('./api');
const database = require('./datafire');
const photosRef = database.ref('photos');

const sanitizeUndefinedProps = (object) => (JSON.parse(JSON.stringify(object)));
const mapPhotoToRef = (ref, photo) => {
  return ref.child(photo.id).set({
    timestamp: photo.takenAt,
    width: photo.originalWidth,
    images: sanitizeUndefinedProps(photo.images),
    caption: photo.caption,
    link: `https://www.instagram.com/p/${photo.code}/`,
    location: sanitizeUndefinedProps(photo.location)
  }, (error) => {
    if (error) {
      return console.log(`Data could not be saved because ${error}`);
    }
    console.log(`Photo ${photo.location.title} saved to firebase`);
  });
};

const saveToTempFile = (photos) => {
  const tempFilePath = path.resolve(__dirname, 'tmp/results.json');
  const asJSON = JSON.stringify(photos);
  fs.writeFile(tempFilePath, asJSON, (err) => {
    if (err) return console.log(err);
    console.log(`Response saved to ${tempFilePath}`);
  });
};

api.connect()
  .then(api.getUserFeed)
  .then((feed) => (api.getMediaStartingWith(feed, 'Café Fronts')))
  .then(photos => {
    const photosPromises = photos.map(photo => {
      return mapPhotoToRef(photosRef, photo);
    });
    Promise.all(photosPromises).then(() => {
      console.log('Firebase update done');
      process.exit();
    });
    saveToTempFile(photos);
  });
