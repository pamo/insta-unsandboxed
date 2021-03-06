'use strict';
const config = require('config').get('auth');
const someUser = config.user;
const pass = config.pass;
const Client = require('instagram-private-api').V1;
const device = new Client.Device(someUser);
const storage = new Client.CookieFileStorage(`${__dirname}/config/${someUser}.json`);
const _ = require('underscore');
const pick = require('lodash/pick');
const Promise = require('bluebird');
const access = require('safe-access');

const getUserFeed = (session, limit = null) => {
  return session.getAccountId().then((id) => new Client.Feed.UserMedia(session, id, limit).all());
};

const getMediaStartingWith = (userFeed, query) => {
  return new Promise((resolve) => {
    const foundPhotos = userFeed.map((post) => (post.getParams()))
      .filter((post) => {
        const caption = access(post, 'caption');
        return caption && caption.startsWith(query);
      })
      .map((matched) => (pick(matched, ['id', 'images', 'originalWidth', 'caption', 'location', 'takenAt', 'code'])));

    resolve(foundPhotos);
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
  getMediaStartingWith
};
