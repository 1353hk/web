module.exports = (obj, isSort) => {
  let url = obj.path || '';

  const keys = Object.keys(obj);
  const querys = keys.filter(v => v !== 'path');
  if (querys.length) {
    const arr = isSort ? querys.sort() : querys; // 是否排序
    const params = arr.map(i => `${i}=${obj[i]}`);
    const str = params.join('&');
    const query = `?${str}`;
    url += query;
  }

  return url;
};
