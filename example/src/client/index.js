import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './../components/App';
import { removeStyle } from 'react-csjs';

const root = document.getElementById('root');
const ssrStyles = document.getElementById('ssr-styles');

const mount = RootComponent => render(
  <AppContainer>
    <RootComponent />
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept('./../components/App', () => {
    const RootComponent = require('./../components/App').default; // eslint-disable-line
    mount(RootComponent);
  });
}

mount(App);
// We can safely remove SSR styles once we've rendered on the client
// since from here on, styles will be auto-mounted/unmounted
removeStyle(ssrStyles);
