import React from 'react';
import { testCss } from '../testUtil';
import csjs from '../../src';

// Tagged Decorator Syntax
@csjs`${testCss}`
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
