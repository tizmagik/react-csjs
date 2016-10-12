import React from 'react';
import csjs from 'csjs';
import withStyles from 'react-csjs';
import Button from '../Button';
import styles from './HelloWorld.style.js';

const HelloWorld = ({ classes }) => (
  <div>
    <div className={classes.hello}>
      <h1>Hello World from react-csjs</h1>
      <p>
        View the source for this in the <code>/example</code> directory.
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
