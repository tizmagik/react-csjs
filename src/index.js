import React, { Component } from 'react';
import csjs from 'csjs';
import insertStyle, { removeStyle, getStyle } from './insert-style';

export default function withStyles(css) {
  return DecoratedComponent =>
    class WithStyleDecorator extends Component {
      static displayName = `csjs(${DecoratedComponent.displayName
                            || DecoratedComponent.name || 'Component'})`

      componentWillMount() {
        this.elm = insertStyle(csjs.getCss(css));
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
        removeStyle(this.elm);
        this.elm = null;
      }

      render() {
        return <DecoratedComponent classes={css} {...this.props} />;
      }
    };
}
