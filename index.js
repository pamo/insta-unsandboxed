'use strict';
const config = require('config').get('auth');
const someUser = config.user;
const pass = config.pass;
const Client = require('instagram-private-api').V1;
const device = new Client.Device(someUser);
const storage = new Client.CookieFileStorage(`${__dirname}/config/${someUser}.json`);
const _ = require('underscore');
const Promise = require('bluebird');

let session = {};
const getUserFeed = (accountId) => {
  const feed = new Client.Feed.UserMedia(session, accountId);
  Promise.map(_.range(0, 20), () => {
      return feed.get();
    })
    .then((results) => {
      let media = _.flatten(results);
      const urls = _.map(media, (medium) => {
        const images = medium._params.images;
        return _.last(images)
      });
      console.log(urls);
    })
};

Client.Session.create(device, storage, someUser, pass)
  .then((resolvedSession) => {
    session = resolvedSession;
    session.getAccountId().then(getUserFeed);
  });
