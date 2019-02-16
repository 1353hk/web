const deepClone = (source, target) => {
  if (typeof source !== 'object') return source;

  let copy;
  if (!target) {
    copy = Array.isArray(source) ? [] : {};
  } else {
    copy = target;
  }

  const keys = Object.keys(source);
  keys.forEach((i) => {
    const item = source[i];
    copy[i] = typeof item === 'object' ? deepClone(item) : item;
  });

  return copy;
};

module.exports = deepClone;
