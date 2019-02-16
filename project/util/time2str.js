module.exports = (arg, type) => {
  // 日期相差
  switch (type) {
    case 'differ':
      return parseInt(Date.now() - arg, 10);
    case 'differYear':
      return parseInt((Date.now() - arg) / 31536000000, 10);
    case 'differMonth':
      return parseInt((Date.now() - arg) / 2592000000, 10);
    case 'differDate':
      return parseInt((Date.now() - arg) / 86400000, 10);
    case 'differHour':
      return parseInt((Date.now() - arg) / 3600000, 10);
    case 'differMinute':
      return parseInt((Date.now() - arg) / 60000, 10);
    case 'differSecond':
      return parseInt((Date.now() - arg) / 1000, 10);

    default:
      break;
  }

  let now;
  if (typeof arg !== 'number') {
    now = new Date();
    type = arg;
  } else {
    now = new Date(arg);
  }

  const arr = [];
  arr.push(now.getFullYear());
  arr.push(now.getMonth() + 1);
  arr.push(now.getDate());
  arr.push(now.getHours());
  arr.push(now.getMinutes());
  arr.push(now.getSeconds());

  for (let i = arr.length; i--;) {
    const item = arr[i];
    if (item < 10) {
      arr[i] = `0${item}`;
    }
  }

  switch (type) {
    case 'ym':
      return `${arr[0]}/${arr[1]}`;
    case 'md':
      return `${arr[1]}/${arr[2]}`;

    case 'hm':
      return `${arr[3]}:${arr[4]}`;
    case 'ms':
      return `${arr[4]}:${arr[5]}`;

    default:
      break;
  }

  const date = `${arr[0]}/${arr[1]}/${arr[2]}`;
  const time = `${arr[3]}:${arr[4]}:${arr[5]}`;
  switch (type) {
    case 'date':
      return date;
    case 'time':
      return time;
    default:
      return `${date} ${time}`;
  }
};
