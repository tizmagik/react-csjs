import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from '../components/App';
import { getStyle } from 'react-csjs';

const server = express();
const clientAssets = require(KYT.ASSETS_MANIFEST);
server.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

// Render the app
const renderedApp = ReactDOM.renderToString(<App />);
// Gather the generated CSS
const renderedStyles = getStyle();

server.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style id="ssr-styles">${renderedStyles}</style>
        <title>react-csjs example app</title>
      </head>
      <body>
        <div id="root">${renderedApp}</div>
        <script src="${clientAssets.main.js}"></script>
      </body>
    </html>
  `);
});

server.listen(parseInt(KYT.SERVER_PORT, 10));
