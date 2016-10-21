import { expect } from 'chai';
import { testCss } from './testUtil';
import insertStyle, { removeStyle, getStyle } from '../src/server';

describe('Server variant', () => {
  describe('insertStyle', () => {
    it('should add a style element with the given CSS', () => {
      const style = insertStyle(testCss);
      expect(style.get(testCss)).to.equal(testCss);
    });
  });

  describe('getStyle', () => {
    it('should get the CSS text for a given key', () => {
      insertStyle(testCss);
      expect(getStyle(testCss)).to.equal(testCss);
    });

    it('should get all the CSS when no key given', () => {
      const blah = 'blah';
      insertStyle(testCss);
      insertStyle(blah);
      const expectedStyles = [testCss, blah].join('\n');
      expect(getStyle()).to.contain(expectedStyles);
    });
  });

  describe('removeStyle', () => {
    it('should remove a given style key', () => {
      const forRemoval = '.removeMe{}';
      insertStyle(forRemoval);
      const removedSuccessfully = removeStyle(forRemoval);
      expect(removedSuccessfully).to.equal(true);
      expect(getStyle()).to.not.contain(forRemoval);
    });
  });
});
