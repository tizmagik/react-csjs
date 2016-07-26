export function getStyle(elm) {
  if ('textContent' in elm) {
    return elm.textContent;
  }

  return elm.styleSheet.cssText; // IE8
}

export function removeStyle(elm) {
  return elm.parentNode.removeChild(elm);
}

export default function (css, options = {}) {
  const elm = options.element || document.createElement('style');
  elm.setAttribute('type', 'text/css');

  if ('textContent' in elm) {
    elm.textContent = css;
  } else {
    elm.styleSheet.cssText = css; // IE8
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
}
