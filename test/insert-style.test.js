import { expect } from 'chai';
import jsdom from 'jsdom';
import { emptyDom, testCss, testElm, testElmIe8 } from './testUtil';
import insertStyle, { removeStyle, getStyle } from '../src/insert-style';

describe('insert-styles.js:', () => {
  let document;

  beforeEach(() => {
    document = jsdom.jsdom(emptyDom);
    global.document = document;
  });

  after(() => {
    delete global.document;
  });

  describe('insertStyle', () => {
    it('should insert a style element with the given CSS (append)', () => {
      const elm = insertStyle(testCss);
      expect(elm.textContent).to.equal(testCss);
    });

    it('should insert a style element with the given CSS (prepend)', () => {
      const elm = insertStyle(testCss, { prepend: true });
      expect(elm.textContent).to.equal(testCss);
    });

    it('should update an existing style element with the given CSS', () => {
      const elm = insertStyle(testCss, { element: testElm });
      expect(getStyle(elm)).to.equal(testCss);
    });

    it('should update an existing IE8 style element with the given CSS', () => {
      const elm = insertStyle(testCss, { element: testElmIe8 });
      expect(getStyle(elm)).to.equal(testCss);
    });
  });

  describe('getStyle', () => {
    it('should get CSS text from a style element', () => {
      const elm = insertStyle(testCss);
      expect(getStyle(elm)).to.equal(testCss);
    });

    it('should get CSS text from an IE8 style element', () => {
      const elm = insertStyle(testCss, { element: testElmIe8 });
      expect(getStyle(elm)).to.equal(testCss);
    });
  });

  describe('removeStyle', () => {
    it('should remove an appended style element', () => {
      const elm = insertStyle(testCss);
      const removedElm = removeStyle(elm);
      expect(removedElm).to.equal(elm);
    });

    it('should remove a prepended style element', () => {
      const elm = insertStyle(testCss, { prepend: true });
      const removedElm = removeStyle(elm);
      expect(removedElm).to.equal(elm);
    });
  });
});
