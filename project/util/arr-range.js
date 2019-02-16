/* 用range初始化数组 */
module.exports = (st, nd, step = 1) => {
  let start;
  let end;

  if (nd !== undefined) {
    start = st;
    end = nd;
  } else {
    start = 0;
    end = st;
  }

  const arr = [];
  switch (true) {
    case start < end:
      for (; start < end; start += step) arr.push(start);
      break;

    case start > end:
      for (; start > end; start -= step) arr.push(start);
      break;

    default:
      break;
  }

  return arr;
};
