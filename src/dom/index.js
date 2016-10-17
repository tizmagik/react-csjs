// DOM variant of insert-style
// insertStyle, { getStyle, removeStyle }


export const getStyle = (elm) => {
  if ('styleSheet' in elm && 'cssText' in elm.styleSheet) {
    return elm.styleSheet.cssText; // IE8
  }

  return elm.textContent;
};

export const removeStyle = elm => elm.parentNode.removeChild(elm);

const insertStyle = (css, options = {}) => {
  const elm = options.element || document.createElement('style');
  elm.setAttribute('type', 'text/css');

  if ('styleSheet' in elm && 'cssText' in elm.styleSheet) {
    elm.styleSheet.cssText = css; // IE8
  } else {
    elm.textContent = css;
  }

  if (!options.element) {
    const head = document.getElementsByTagName('head')[0];
    if (options && options.prepend) {
      head.insertBefore(elm, head.childNodes[0]);
    } else {
      head.appendChild(elm);
    }
  }

  return elm;
};

export default insertStyle;
