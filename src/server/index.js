// Node variant of insert-style
// insertStyle, { getStyle, removeStyle }

const serverStyles = new Map();

export const getStyle = (key) => {
  if (key) {
    return serverStyles.get(key);
  }

  return Array.from(serverStyles.values()).join('\n');
};

export const removeStyle = key => serverStyles.delete(key);

const insertStyle = style => serverStyles.set(style, style);
export default insertStyle;
