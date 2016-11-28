import React, { Component } from 'react';
import csjs from 'csjs';
import scopedName from 'csjs/lib/scoped-name';
import insertStyle, { removeStyle, getStyle } from './insert-style';

const cache = {};

export { removeStyle, getStyle };

export default function (userCss, ...values) {
  let css = userCss;

  if (Array.isArray(css)) {
    // Forward string literals to csjs
    css = csjs(css, ...values);
  }

  let cssText = csjs.getCss(css);
  const scope = scopedName(cssText)('DecoratedComponent');

  return DecoratedComponent =>
    class WithStyleDecorator extends Component {
      static displayName = `csjs(${DecoratedComponent.displayName
                            || DecoratedComponent.name || 'Component'})`

      componentWillMount() {
        const refs = cache[scope];
        if (!refs) {
          this.elm = insertStyle(cssText);
          cache[scope] = { style: this.elm, count: 1 };
        } else {
          this.elm = refs.style;
          refs.count += 1;
        }
      }

      componentWillUpdate() {
        if (process.env.NODE_ENV !== 'production') {
            // Support React Hot Loader
          cssText = csjs.getCss(css);
          if (getStyle(this.elm) !== cssText) {
            this.elm = insertStyle(cssText, { element: this.elm });
          }
        }
      }

      componentWillUnmount() {
        const refs = cache[scope];
        if (refs) {
          refs.count -= 1;
          if (refs.count === 0) {
            delete cache[scope];
            removeStyle(this.elm);
            this.elm = null;
          }
        }
      }

      render() {
        return <DecoratedComponent classes={css} oprops={this.props} {...this.props} />;
      }
    };
}
