const fs = require('fs');
const path = require('path');
const api = require('./api');
const database = require('./datafire');
const photosRef = database.ref('photos');

const transformPhotoData = (data) => ({
  id: data.id,
  timestamp: data.takenAt,
  width: data.originalWidth,
  images: sanitizeUndefinedProps(data.images),
  caption: data.caption,
  link: `https://www.instagram.com/p/${data.code}/`,
  location: sanitizeUndefinedProps(data.location)
});

const sanitizeUndefinedProps = (object) => (JSON.parse(JSON.stringify(object)));
const mapPhotoToRef = (ref, photo) => {
  return ref.child(photo.id).set(photo, (error) => {
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
    let transformedCollection = [];
    const photosPromises = photos.map(photo => {
      const transformedPhoto = transformPhotoData(photo);
      console.log(transformedPhoto);
      transformedCollection.push(transformedPhoto);
      return mapPhotoToRef(photosRef, transformedPhoto);
    });
    Promise.all(photosPromises).then(() => {
      console.log('Firebase update done');
      process.exit();
    });
    saveToTempFile(transformedCollection);
  });
