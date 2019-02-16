module.exports = (...arg) => {
  let length = arg.length;

  // 无参数时
  if (length === 0) {
    console.count('次数');
  } else {
    // 有参数时

    // 获取最后一个参数
    let last = arg[length - 1];
    if (last === undefined || last === null) {
      console.log.apply(console, arg);
    } else {
      // 如果参数有constructor属性
      let constructor = last.constructor;

      // 如果参数为字串或数值
      if (constructor !== Array && constructor !== Object) {
        console.log.apply(console, arg);
      } else {
        // 如果参数为数组或对象
        for (let i = 0; i < length; i++) {
          let item = arg[i];
          let constructor = item.constructor;

          // 如果参数为数组或对象
          if (constructor === Array || constructor === Object) {
            // 第一个参数
            if (i === 0) {
              // 分组名为console.group
              console.group();
            }
            console.table(item);
          } else {
            // 第一个参数
            if (i === 0) {
              // 分组名为item
              console.group(item);
            } else {
              console.log(item);
            }
          }
        }
        console.groupEnd();
      }
    }
  }
};
