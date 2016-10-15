/*
  <Code />

  This file shows the pattern of using the tagged template
  wrapper around the default export of a stateless functional
  component.
*/

import React, {Component} from 'react';
import csjs from 'react-csjs';

const Code =
  ({ classes, children }) => <code className={classes.code}>{children}</code>;

export default csjs`
  .code {
    display: inline-block;
    color: crimson;
  }
`(Code);
