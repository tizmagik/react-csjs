import { expect } from 'chai';

const cacheKey = require.resolve('../src/insert-style');

describe('insert-style', () => {
  beforeEach(() => {
    if (require.cache[cacheKey]) {
      console.log('deleting cache');
      delete require.cache[cacheKey];
    }
  });

  describe('when in a browser', () => {
    it('should return DOM variant', () => {
      global.document = {};
      const insertStyle = require('../src/insert-style');
      expect(insertStyle.__get__('isServer')).to.equal(false);
      delete global.document;
    });
  });

  describe('when on the server', () => {
    it('should return Server variant', () => {
      const insertStyle = require('../src/insert-style');
      expect(insertStyle.__get__('isServer')).to.equal(true);
    });
  });
});
