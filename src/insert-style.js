// Depending on environment, we return the proper
// DOM or Node-based version of 'insert-style'
// insertStyle, { getStyle, removeStyle }

import insertStyleServer,
  { getStyle as getStyleServer, removeStyle as removeStyleServer } from './server';
import insertStyleDOM,
  { getStyle as getStyleDOM, removeStyle as removeStyleDOM } from './dom';

const isServer = (typeof document === 'undefined');

const getStyle = isServer ? getStyleServer : getStyleDOM;
const removeStyle = isServer ? removeStyleServer : removeStyleDOM;
const insertStyle = isServer ? insertStyleServer : insertStyleDOM;

export { getStyle, removeStyle };
export default insertStyle;
