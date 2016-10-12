import React from 'react';
import { shallow } from 'enzyme';
import App from './index';
import HelloWorld from '../HelloWorld';

it('Tests that the App renders.', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<HelloWorld />)).toBeTruthy();
});
