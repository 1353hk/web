module.exports = (obj) => {
  const arr = [];
  let str = '';
  switch (Object.prototype.toString.call(obj)) {
    case '[object Object]':
      for (const i in obj) {
        if (!obj.hasOwnProperty(i)) return;

        const item = obj[i];
        if (typeof obj === 'object') {
          arr.push(`${i}: ${fun(item)}`);
        } else {
          arr.push(`${i}: ${item}`);
        }
      }
      str = `{${arr.join(';\n\n')}}`;
      break;

    case '[object Array]':
      for (const i of obj) {
        if (typeof i === 'object') {
          arr.push(fun(i));
        } else {
          arr.push(i);
        }
      }
      str = `[${arr.join(', ')}]`;
      break;

    default:
      str = obj;
      break;
  }

  return str;
};
