/* 

import URLSearch from './url-search'; //获取查询参数

let params = new URLSearch();

*/

module.exports = class {
  constructor(search = window.location.search) {
    let query = search.charAt(0) === '?' ? search.substr(1) : search;
    let arr = query.split('&'); //分割参数
    let parms = arr.reduce((p, item, index, a) => {
      let [k, v] = item.split('='); //分割键值对
      let val = window.decodeURIComponent(v); //解码

      // 判断是否有数组
      let key = p[k];
      if (key) val = [key, val];

      let obj = {
        ...p,
        [k]: val,
      };
      return obj;
    }, {});
    this.parms = parms;
  }

  // 序列化
  toString(isSort) {
    let keys = Object.keys(this.parms);
    if (!keys.length) return '';

    let arr = isSort ? keys.sort() : keys; // 是否排序
    let parms = arr.reduce((p, key) => {
      let val = this.parms[key];
      if (Array.isArray(val)) {
        // 数组
        let sub = val.map(item => `${key}=${window.encodeURIComponent(item)}`);
        let next = [...p, ...sub];
        return next;
      }

      let next = [...p, `${key}=${window.encodeURIComponent(val)}`];
      return next;
    }, []);

    let str = parms.join('&');
    return str;
  }
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.parms, key);
  }
  get(key) {
    return this.parms[key] || null;
  }
  getAll() {
    return this.parms;
  }
  set(key, val) {
    this.parms[key] = val;
    return this.getAll();
  }
  delete(key) {
    delete this.parms[key];
    return this.getAll();
  }
  keys() {
    return Object.keys(this.parms);
  }
  values() {
    return Object.values(this.parms);
  }
  entries() {
    return Object.entries(this.parms);
  }
};
