'use strict';
const chai = require('chai');
const expect = chai.expect;

describe('Connect with Private API', () => {

  let api;

  beforeEach(function() {
    api = require('../index.js');
  });

  it('should have a session', function() {
    const Client = require('instagram-private-api').V1;
    api.connect().then((session) => {
      expect(session).to.exist;
      expect(session).to.be.instanceof(Client.Session);
    });
  });

  it('should get authenticated user media urls', function() {
    api.connect().then((resolvedSession) => resolvedSession).then((session) => {
      console.log(api.getUserFeed(session));
      then((urls) => {
        expect(urls).to.exist;
      });
    });
  });

});
