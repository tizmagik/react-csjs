import csjs from 'csjs';
import { jsdom } from 'jsdom';

export const testCss = `
  .button {
    background-color: purple
  }

  .label {
    color: blue
  }
`;

export const testStyles = csjs`${testCss}`;

export const testElm = jsdom().createElement('style');
testElm.setAttribute('type', 'text/css');

export const testElmIe8 = jsdom().createElement('style');
testElmIe8.setAttribute('type', 'text/css');
testElmIe8.styleSheet = { cssText: testCss };
