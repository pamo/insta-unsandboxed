const api = require('./api');
const fs = require('fs');
const path = require('path');

api.connect()
  .then(api.getUserFeed)
  .then((feed) => {
    return api.getMediaStartingWith(feed, 'Café Fronts');
  })
  .then((response) => {
    const temporaryPath = path.join(__dirname, 'tmp/results.json');
    fs.writeFile(temporaryPath, response, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log(`The file was saved to ${temporaryPath}!`);
    });
  });

