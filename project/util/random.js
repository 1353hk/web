module.exports = (arg, num = 1, unique) => {
  // 如果参数为数值时
  if (typeof arg === 'number') {
    const arr = [];
    for (let i = 0; i < arg; i += 1) {
      arr.push(i);
    }
    arg = arr;
  }

  // 如果参数为字串时
  if (typeof arg === 'string') {
    arg = arg.trim().split('');
  }

  const len = arg.length;

  // 获取0个元素时变成获取原个数
  if (num === 0) num = len;

  if (num > 1) {
    // 获取多个元素
    const arr = [];

    // 获取不重复数组时获取个数不能超过数组个数
    if (unique && num > len) num = len;

    for (let i = 0; i < num; i += 1) {
      let index;
      if (unique) {
        // 获取不重复数组
        do {
          index = Math.floor(Math.random() * len);
        } while (arr.some(i => i === arg[index]));
      } else {
        // 获取可重复数组
        index = Math.floor(Math.random() * len);
      }
      arr.push(arg[index]);
    }
    return arr;
  }
  // 获取单个元素
  const index = Math.floor(Math.random() * len);
  return arg[index];
};
