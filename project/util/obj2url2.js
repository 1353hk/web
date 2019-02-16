/**
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
module.exports = (obj) => {
  if (!obj) return '';

  const pairs = [];

  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = obj[key];

    if (value instanceof Array) {
      for (let i = 0; i < value.length; i += 1) {
        pairs.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(value[i])}`);
      }
    } else {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  }

  return pairs.join('&');
};
