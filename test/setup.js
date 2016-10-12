import jsdom from 'jsdom';
import React from 'react';
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

export const ButtonComponent = ({ classes, children }) => (
  <div className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </div>
);

export const WrappedButton = withStyles(testCss)(ButtonComponent);

@withStyles(testCss)
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

export const testElm = jsdom.jsdom().createElement('style');
testElm.setAttribute('type', 'text/css');

export const testElmIe8 = jsdom.jsdom().createElement('style');
testElmIe8.setAttribute('type', 'text/css');
testElmIe8.styleSheet = { cssText: testCss };
