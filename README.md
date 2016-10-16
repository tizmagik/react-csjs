# React CSJS

React Higher Order Component for [CSJS](https://github.com/rtsao/csjs). Automatically mounts/unmounts styles, works with React Hot Loader. _Inspired by the JSS-equivalent, [react-jss](https://github.com/jsstyles/react-jss)._

[![npm](https://img.shields.io/npm/v/react-csjs.svg)](https://www.npmjs.com/package/react-csjs)
[![Build Status](https://travis-ci.org/tizmagik/react-csjs.svg?branch=master)](https://travis-ci.org/tizmagik/react-csjs)
[![Coverage Status](https://coveralls.io/repos/github/tizmagik/react-csjs/badge.svg)](https://coveralls.io/github/tizmagik/react-csjs)

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

### The `classes` property

react-csjs adds its own `classes` prop to the higher order component which contains the same CSJS object that was passed in through `withStyles`. You are welcome to use `classes` or the original styles object if it is still in scope, but in some circumstances the `classes` prop may be your only option.

Popular linting rules such as [`react/prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md) from [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) will complain that the `classes` prop is missing from props validation. There are several ways to address this:

1. Add the `classes` prop to your component's propTypes:

    ```js
    Button.propTypes = {
      classes: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    };
    ```

2. Tweak the lint rule to ignore the `classes` prop:

    ```json
    "prop-types": [2, { "ignore": ["classes"] }]
    ```

## Example

You can see a fully working example of an app using `react-csjs` in the [/example](/example) directory.

## Server-side Rendering

Isomorphic/universal react-csjs is coming (see [#24](https://github.com/tizmagik/react-csjs/issues/24)). Currently, it expects the global `document` object to be present when inserting styles. As this does not exist in a typical server side environment by default, you are responsible for providing one as a workaround for now. You may do so using something like [jsdom](https://github.com/tmpvar/jsdom) and rendering your app there instead of using the traditional `ReactDOMServer.renderToString` method. See the [isomorphic-react-csjs-demo](https://github.com/wKovacs64/isomorphic-react-csjs-demo) project for an example of this technique.
