export default (...arg) => {
  const { length } = arg;

  // 无参数时
  if (length === 0) {
    console.count('次数');
  } else {
    // 有参数时
    console.log(...arg);
  }
};
