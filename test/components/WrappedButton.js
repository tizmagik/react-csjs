import React from 'react';
import { testStyles } from '../testUtil';
import withStyles from '../../src';

// Wrapped Syntax
const ButtonComponent = ({ classes, children }) => (
  <div className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </div>
);

export default withStyles(testStyles)(ButtonComponent);
