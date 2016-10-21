'use strict';
const config = require('config').get('auth');
const someUser = config.user;
const pass = config.pass;
const Client = require('instagram-private-api').V1;
const device = new Client.Device(someUser);
const storage = new Client.CookieFileStorage(`${__dirname}/config/${someUser}.json`);
const _ = require('underscore');
const Promise = require('bluebird');
const limit = 10;

let session;

const getUserFeed = (session) => {
  return session.getAccountId().then((id) => new Client.Feed.UserMedia(session, id, limit));
};

const getMedias = (userFeed) => {
  return userFeed.all().then((medias) => {
    return _.forEach(medias, (medium) => { medium.Media });
  });
};

const connect = () => {
  return Client.Session.create(device, storage, someUser, pass)
    .then((resolvedSession) => {
      return resolvedSession;
    });
};

module.exports = {
  connect,
  getUserFeed,
  getMedias
};
