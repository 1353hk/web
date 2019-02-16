function isEmptyObj(o) {
  for (const attr in o) return !1;
  return !0;
}
function processArray(arr) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (arr[i] === null || arr[i] === undefined) arr.splice(i, 1);
    else if (typeof arr[i] === 'object') removeNullItem(arr[i], arr, i);
  }
  return arr.length === 0;
}
function proccessObject(o) {
  for (const attr in o) {
    if (o[attr] === null || o[attr] === undefined) delete o[attr];
    else if (typeof o[attr] === 'object') {
      removeNullItem(o[attr]);
      if (isEmptyObj(o[attr])) delete o[attr];
    }
  }
}
function removeNullItem(o, arr, i) {
  const s = o.constructor;
  if (s === Array) {
    if (processArray(o) === true) {
      // o也是数组，并且删除完子项，从所属数组中删除
      if (arr) arr.splice(i, 1);
    }
  } else if (s === Object) {
    proccessObject(o);
    if (arr && isEmptyObj(o)) arr.splice(i, 1);
  }
}

module.exports = removeNullItem;
