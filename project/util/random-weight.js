/*

let randomWeight = require('./util/random-weight');

let getItem = randomWeight([]);
let getItem = randomWeight([], ''); //设置权重, 默认为weight
let item = getItem();

*/

const getRange = ([arr, key = 'weight']) => {
  // 获取概率列表
  const randomList = arr.reduce((pv, cv) => {
    const len = pv.length;
    const last = len ? pv[len - 1] : 0; // 获取叠加的概率
    const weight = +cv[key]; // 提取权重
    return pv.concat(last + weight); // 叠加概率后添加到数组
  }, []);

  const randomListLen = randomList.length;
  const range = randomList[randomListLen - 1]; // 计算出范围

  return {
    arr,
    randomList,
    range,
  };
};

const getItem = ({ arr, randomList, range }) => {
  const random = Math.floor(Math.random() * range); // 计算出位置
  const index = randomList.findIndex(i => i > random); // 获取命中索引
  const item = arr[index]; // 获取命中结果
  return item;
};

module.exports = (...arg) => {
  const obj = getRange(arg);
  return () => getItem(obj); // 柯里化
};
