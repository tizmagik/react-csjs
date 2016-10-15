/*
  <HelloWorld />

  This component shows the pattern of moving
  styles to an adjacent file, HelloWorld.style.js
  and then wrapping the default export with withStyles()

  See the other components imported here for more sample usage.
*/

import React from 'react';
import csjs from 'csjs';
import withStyles from 'react-csjs';
import Header from '../Header';
import Button from '../Button';
import Code from '../Code';
import styles from './HelloWorld.style.js';

const HelloWorld = ({ classes }) => (
  <div>
    <div className={classes.hello}>
      <Header>Hello World from react-csjs</Header>
      <p>
        View the source for this in the <Code>/example</Code> directory.
      </p>
      <p>
        Here is a styled button:<br /><br /><Button />
      </p>
      <hr />
    </div>
    <div className={classes.footer}>
      <p>
        View this project on <a href="http://github.com/tizmagik/react-csjs">Github</a>
      </p>
    </div>
  </div>
);

export default withStyles(styles)(HelloWorld);
