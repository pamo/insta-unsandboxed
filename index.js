const api = require('./api');

api.connect()
  .then(api.getUserFeed)
  .then((feed) => {
    return api.getMediaStartingWith(feed, 'Café Fronts');
  })
  .then((response) => {
    console.log(response);
  });

