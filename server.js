const fs = require('fs');
const path = require('path');
const api = require('./api');
const firebase = require('./datafire');
const parser = require('./responseParser');
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
      const transformedPhoto = parser.transformResponseProperties(photo);
      console.log(transformedPhoto);
      transformedCollection.push(transformedPhoto);
      return firebase.database().savePhoto(transformedPhoto);
    });
    Promise.all(photosPromises).then(() => {
      console.log('Firebase update done');
      process.exit();
    });
    saveToTempFile(transformedCollection);
  });
