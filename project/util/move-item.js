/*

const moveItem = require('../../utils/move-item'); // 移动元素

moveItem([0, 1, 2], 1); // 简单模式
// [1,0,2]

moveItem({
  arr: [0, 1, 2], // 传入数组
  item: 1, // 移动元素
});
// [1,0,2]

moveItem({
  arr: [0, 1, 2], // 传入数组
  index: 1, // 移动元素索引
});
// [1,0,2]

moveItem({
  arr: [0, 1, 2], // 传入数组
  index: 1, // 移动元素索引
  to: 0, // 新位置索引
});
// [1,0,2]

moveItem({
  arr: [0, 1, 2], // 传入数组
  index: 1, // 移动元素索引
  to: -1, // 新位置索引
});
// [0,2,1]

moveItem({
  arr: [0, 1, 2], // 传入数组
  index: 1, // 移动元素索引
  move: 1, // 向右移动1位
});
// [0,2,1]

moveItem({
  arr: [0, 1, 2], // 传入数组
  index: 1, // 移动元素索引
  move: -1, // 向左移动1位
});
// [1,0,2]

 */

module.exports = (obj, i, t = 0) => {
  let arr; // 传入数组
  let item; // 移动元素
  let index; // 移动元素索引
  let to; // 新位置索引
  let move; // 移动距离

  // 是否为简单模式
  if (obj instanceof Array) {
    arr = obj;
    item = i;
    to = t;
  } else {
    ({
      arr, item = '', index, to = 0, move = 0,
    } = obj);
  }

  if (!arr) throw new Error('请输入数组: arr');

  const newArr = arr;

  let oldIndex;
  let val;

  if (item !== '') {
    // 已知元素
    oldIndex = newArr.findIndex(v => v === item); // 获取数组中的索引
    if (oldIndex !== -1) newArr.splice(oldIndex, 1); // 如果数组中存在该元素
    val = item;
  } else if (index !== undefined) {
    // 已知索引
    oldIndex = index;
    [val] = newArr.splice(oldIndex, 1); // 获取元素
  } else {
    throw new Error('请输入 item 或 index');
  }

  // 获取新索引位置
  let newIndex;
  if (move) {
    newIndex = oldIndex + move; // 移动距离
  } else if (to === -1) {
    newIndex = newArr.length; // 移动到末尾
  } else {
    newIndex = to; // 新位置
  }

  newArr.splice(newIndex, 0, val); // 插入回数组
  return newArr;
};
