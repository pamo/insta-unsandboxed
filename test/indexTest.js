'use strict';
const chai = require('chai');
const expect = chai.expect;
const Client = require('instagram-private-api').V1;

describe('Connect with Private API', () => {

  let api;

  beforeEach(function() {
    api = require('../index.js');
  });

  it('should have a session', function(done) {
    api.connect().then((session) => {
      expect(session).to.exist;
      expect(session).to.be.instanceof(Client.Session);
      done();
    });
  });

  it('should get authenticated user feed', function(done) {
    api.connect().then((resolvedSession) => resolvedSession).then((session) => {
      api.getUserFeed(session).then((feed) => {
        expect(feed).to.be.instanceOf(Client.Feed.UserMedia);
        done();
      });
    });
  });

  it('should get all user media', function(done) {
    api.connect().then((resolvedSession) => resolvedSession).then((session) => {
      api.getUserFeed(session).then((feed) => {
        api.getMedias(feed).then((medias) => {
          expect(medias).to.exist;
          done();
        });
      });
    });
  });


});
