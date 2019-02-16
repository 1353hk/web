module.exports = (oldNum, newNum, cb) => new Promise((resolve) => {
  oldNum = +oldNum;
  newNum = +newNum;

  let num = oldNum;
  const done = false;

  let step; // 步进数
  const differ = Math.abs(oldNum - newNum);
  switch (true) {
    case differ < 200:
      step = 1;
      break;

    case differ < 2000:
      step = 10;
      break;

    case differ < 20000:
      step = 100;
      break;

    case differ < 200000:
      step = 1000;
      break;

    case differ < 2000000:
      step = 10000;
      break;

    default:
      step = Math.floor(differ / 20);
      break;
  }

  const obj = {
    oldNum,
    newNum,
    done,
  };

    // 渐减
  if (oldNum > newNum) {
    const id = setInterval(() => {
      num -= step;

      if (num <= newNum) {
        clearInterval(id);

        obj.id = id;
        obj.num = newNum;
        obj.done = true;

        cb(obj);
        resolve(obj);
      } else {
        obj.num = num;
        cb(obj);
      }
    }, 17);

    obj.id = id;
  }

  // 渐加
  if (oldNum < newNum) {
    const id = setInterval(() => {
      num += step;

      if (num >= newNum) {
        clearInterval(id);

        obj.id = id;
        obj.num = newNum;
        obj.done = true;

        cb(obj);
        resolve(obj);
      } else {
        obj.num = num;
        cb(obj);
      }
    }, 17);

    obj.id = id;
  }
});
