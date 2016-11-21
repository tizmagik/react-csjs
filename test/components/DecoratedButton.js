import React from 'react';
import { testStyles } from '../testUtil';
import withStyles from '../../src';

// Decorator Syntax
@withStyles(testStyles)
export default class extends React.Component {
  render() {
    return (
      <div className={this.props.classes.button}>
        <span className={this.props.classes.label}>
          {this.props.children}
        </span>
      </div>
    );
  }
}
