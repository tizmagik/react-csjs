/*
  <App />

  This is just a top-level thin wrapper.

  All react-csjs usage starts in `<HelloWorld />`
*/

import React from 'react';
import HelloWorld from '../HelloWorld';

const App = () => (
  <div>
    <HelloWorld />
  </div>
);

export default App;
