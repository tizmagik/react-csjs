import jsdom from 'jsdom';
import React from 'react';
import csjs from 'csjs';
import withStyles from '../src';

export const emptyDom = `
  <!DOCTYPE html><html><head></head><body></body></html>
`;

export const testCss = `
  .button {
    background-color: purple
  }

  .label {
    color: blue
  }
`;

export const testStyles = csjs`${testCss}`;

// Decorator Syntax
@withStyles(testStyles)
export class DecoratedButton extends React.Component {
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

// Wrapped Syntax
export const ButtonComponent = ({ classes, children }) => (
  <div className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </div>
);

export const WrappedButton = withStyles(testStyles)(ButtonComponent);

export const testElm = jsdom.jsdom().createElement('style');
testElm.setAttribute('type', 'text/css');

export const testElmIe8 = jsdom.jsdom().createElement('style');
testElmIe8.setAttribute('type', 'text/css');
testElmIe8.styleSheet = { cssText: testCss };
