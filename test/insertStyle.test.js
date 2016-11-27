/* eslint-disable global-require */
import { expect } from 'chai';

const cacheKey = require.resolve('../src/insert-style');

describe('insertStyle', () => {
  const document = global.document;

  after(() => {
    global.document = document;
  });

  beforeEach(() => {
    if (require.cache[cacheKey]) {
      delete require.cache[cacheKey];
    }
  });

  describe('when in a browser', () => {
    it('should return DOM variant', () => {
      global.document = {};
      const insertStyle = require('../src/insert-style');

      expect(insertStyle.__get__('isServer')).to.equal(false);
    });
  });

  describe('when on the server', () => {
    it('should return Server variant', () => {
      delete global.document;
      const insertStyle = require('../src/insert-style');

      expect(insertStyle.__get__('isServer')).to.equal(true);
    });
  });
});
