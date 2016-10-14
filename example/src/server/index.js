
/* eslint-disable prefer-template */

import path from 'path';
import express from 'express';

const clientAssets = require(KYT.ASSETS_MANIFEST);

const app = express();

app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.get('/', (req, res) => {
  res.send(`
    <head>
      <link rel="shortcut icon" href='/kyt-favicon.png'>
      ${clientAssets.main.css ?
        '<link rel="stylesheet" type="text/css" href="' + clientAssets.main.css + '">'
        : ''}
      <title>React kyt</title>
    </head>
    <body>
      <div id='root'></div>
      <script src='${clientAssets.main.js}'></script>
    </body>
  `);
});

app.listen(parseInt(KYT.SERVER_PORT, 10));
