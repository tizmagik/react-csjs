import React, { Component } from 'react';
import csjs from 'csjs';
import insertStyle, { removeStyle, getStyle } from './insert-style';
import rebuilder from './rebuilder';

const cache = new Map();

export default function (userCss, ...values) {
  let css = userCss;

  if (Array.isArray(css)) {
    css = rebuilder(css, ...values);
    // Forward string literals to csjs
    css = csjs([css]);
  }

  return DecoratedComponent =>
    class WithStyleDecorator extends Component {
      static displayName = `csjs(${DecoratedComponent.displayName
                            || DecoratedComponent.name || 'Component'})`

      componentWillMount() {
        const refs = cache.get(DecoratedComponent);
        if (!refs) {
          this.elm = insertStyle(csjs.getCss(css));
          cache.set(DecoratedComponent, { style: this.elm, count: 1 });
        } else {
          this.elm = refs.style;
          refs.count += 1;
        }
      }

      componentWillUpdate() {
        if (process.env.NODE_ENV !== 'production') {
            // Support React Hot Loader
          const cssText = csjs.getCss(css);
          if (getStyle(this.elm) !== cssText) {
            this.elm = insertStyle(cssText, { element: this.elm });
          }
        }
      }

      componentWillUnmount() {
        const refs = cache.get(DecoratedComponent);

        refs.count -= 1;
        if (refs.count === 0) {
          cache.delete(DecoratedComponent);
          removeStyle(this.elm);
          this.elm = null;
        }
      }

      render() {
        return <DecoratedComponent classes={css} {...this.props} />;
      }
    };
}
