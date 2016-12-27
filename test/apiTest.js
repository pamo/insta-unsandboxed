'use strict';
const chai = require('chai');
const expect = chai.expect;
const Client = require('instagram-private-api').V1;

describe.skip('Connect with Private API', () => {

  let api;

  beforeEach(function() {
    api = require('../api.js');
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
      api.getUserFeed(session, 1).then((feed) => {
        expect(feed).to.be.instanceOf(Array);
        expect(feed[0]).to.be.instanceOf(Client.Media);
        done();
      });
    });
  });

  it('should get all user media starting with a query', function(done) {
    api.connect().then((resolvedSession) => resolvedSession).then((session) => {
      api.getUserFeed(session, 1).then((feed) => {
        const query = 'Café Fronts';
        api.getMediaStartingWith(feed, query).then((medias) => {
          expect(medias).to.exist;
          medias.forEach((medium) => {
            const caption = medium.caption;
            expect(caption).to.contain(query);
          });
          done();
        });
      });
    });
  });
});
