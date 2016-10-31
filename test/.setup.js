/**
 * This file is used to initialize a DOM for the test environment. It MUST be
 * loaded prior to React, Enzyme, etc., so we require it with mocha directly.
 */
import { jsdom } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];
const emptyDom = '<!DOCTYPE html><html><head></head><body></body></html>';

global.document = jsdom(emptyDom);
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = window.navigator;
