const reg = new RegExp('\\d+(\\.\\d+)*');
const str2arr = (arg) => {
  const str = `${arg}`;
  const match = str.match(reg)[0];
  return match.split('.');
};

module.exports = (v1, v2) => {
  const v1arr = str2arr(v1);
  const v2arr = str2arr(v2);

  const len = Math.max(v1arr.length, v2arr.length);

  for (let i = 0; i < len; i += 1) {
    const v1num = +v1arr[i] || 0;
    const v2num = +v2arr[i] || 0;

    if (v1num > v2num) return 1;
    if (v1num < v2num) return -1;
  }

  return 0;
};
