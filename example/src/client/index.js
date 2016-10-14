import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './../components/App';

const root = document.querySelector('#root');

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
