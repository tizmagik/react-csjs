/*
  <Header />

  This file shows using the tagged template @decorator pattern.
*/

import React, { Component } from 'react';
import csjs from 'react-csjs';

const crimson = 'crimson';
const lineHeight = '1.8em';

@csjs`
  .header {
    color: ${crimson};
    line-height: ${lineHeight};
  }
`
export default class Header extends Component {
  render() {
    /*
       no `styles` object in scope,
       so we use `classes` prop provided by react-csjs
    */
    return <h1 className={this.props.classes.header}>{this.props.children}</h1>;
  }
};
