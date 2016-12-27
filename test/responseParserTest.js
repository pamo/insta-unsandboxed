'use strict';
const chai = require('chai');
const expect = chai.expect;
const Client = require('instagram-private-api').V1;

describe('Connect with Private API', () => {

  const parser = require('../responseParser.js');
  const location = {
    title: 'Home',
    city: undefined,
    lat: null,
    long: 77.000
  };

  const images = [
    {
      url: 'http://google.com'
    }
  ];

  const apiResponse = {
    id: 'blah',
    takenAt: 12345,
    originalWidth: 320,
    images: images,
    caption: 'hi',
    location: location
  };

  it('should remove undefined properties', () => {
    const transformedLocation = parser.sanitizeUndefinedProps(apiResponse).location;
    expect(transformedLocation.city).to.be.undefined;
    expect(transformedLocation.title).to.eq('Home');
    expect(transformedLocation.lat).to.eq(null);
  });

  describe('transforming response', () => {
    const imageCode = 'ABCDEF';
    apiResponse.code = imageCode;
    const transformed = parser.transformResponseProperties(apiResponse);

    it('should assign data code to instagram url', () => {
      expect(transformed.link).to.be.defined;
      expect(transformed.link).to.eq(`https://www.instagram.com/p/${imageCode}/`);
    });

    it('set a width equal to originalWidth', () => {
      expect(transformed.width).to.be.defined;
      expect(transformed.width).to.eq(apiResponse.originalWidth);
    });

    it('set a timestamp', () => {
      expect(transformed.timestamp).to.be.defined;
      expect(transformed.timestamp).to.eq(apiResponse.takenAt);
    });

    it('have a lat and long', () => {
      expect(transformed.location).to.be.defined;
      expect(transformed.location.lat).to.eq(apiResponse.location.lat);
      expect(transformed.location.long).to.eq(apiResponse.location.long);
    });

    it('have a caption', () => {
      expect(transformed.caption).to.be.defined;
      expect(transformed.caption).to.eq(apiResponse.caption);
    });

    it('have a collection of images', () => {
      expect(transformed.images).to.be.defined;
      expect(transformed.images).to.eql(apiResponse.images);
    });
  });
});
