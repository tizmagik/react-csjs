# React CSJS

React Higher Order Component for [CSJS](https://github.com/rtsao/csjs). Automatically mounts/unmounts styles, works with React Hot Loader. _Inspired by the JSS-equivalent, [react-jss](https://github.com/jsstyles/react-jss)._

[![npm](https://img.shields.io/npm/v/react-csjs.svg)](https://www.npmjs.com/package/react-csjs)

### Auto-mount/unmounting of styles

The benefit of using react-csjs instead of using CSJS directly is auto-mount/unmount so that only the styles relevant to which components are currently rendered into the DOM will be mounted; and then once those components are removed/unmounted, so will their styles.

### Installation

You'll need to install both `csjs` and `react-csjs` like so:

```
npm install --save csjs react-csjs
```

## Usage

##### tagged `@decorator` syntax

You can use react-csjs as a higher order component via the decorators syntax (which you'll need something like [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) for it to work).

Simply pass the CSS as a string literal. If CSJS plugins like [babel-plugin-csjs-postcss](https://github.com/rtsao/babel-plugin-csjs-postcss) are used, they will apply their transforms as usual as long as the default export is named "csjs".

```js
import React from 'react';
import csjs from 'react-csjs';

@csjs`
.button {
  background-color: purple
}
.label {
  color: blue
}`
export default class Button extends React.Component {
  render() {
    return (
      <div className={this.props.classes.button}>
        <span className={this.props.classes.label}>
          {this.props.children}
        </span>
      </div>
    )
  }
}
```

##### `@decorator` syntax

You can also use react-csjs as a higher order component in combination with CSJS via the decorators syntax. The decorator can be exported under any name, in this case "withStyles."

```js
import React from 'react';
import csjs from 'csjs';
import withStyles from 'react-csjs';

const styles = csjs`
.button {
  background-color: purple
}
.label {
  color: blue
}`;

@withStyles(styles)
export default class Button extends React.Component {
  render() {
    return (
      <div className={this.props.classes.button}>
        <span className={this.props.classes.label}>
          {this.props.children}
        </span>
      </div>
    )
  }
}
```

##### Default export wrapper

_Or_ you can wrap your default export if you'd prefer not to use the decorator syntax, or you're applying to a stateless functional component, like so:

```js
import React from 'react';
import csjs from 'csjs';
import withStyles from 'react-csjs';

const styles = csjs`
.button {
  background-color: purple
}
.label {
  color: blue
}`;

const Button = ({classes, children}) => (
  <div className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </div>
);

export default withStyles(styles)(Button);
```
