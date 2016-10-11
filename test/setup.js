import jsdom from 'jsdom';

export const emptyDom = `
  <!DOCTYPE html><html><head></head><body></body></html>
`;

export const testCss = `
  .button {
    background-color: purple
  }

  .label {
    color: blue
  }
`;

export const testElm = jsdom.jsdom().createElement('style');
testElm.setAttribute('type', 'text/css');

export const testElmIe8 = jsdom.jsdom().createElement('style');
testElmIe8.setAttribute('type', 'text/css');
testElmIe8.styleSheet = { cssText: testCss };
