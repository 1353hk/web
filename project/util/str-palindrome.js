/* 检查回文 */
module.exports = (str) => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');

  return (
    s
    === s
      .split('')
      .reverse()
      .join('')
  );
};
