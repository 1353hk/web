/**
 * 随机回调函数名
 */
let cbName = () => {
  let random = Math.random() * 1000000;
  return `jsonp${Math.ceil(random)}`;
};

module.exports = (url, par, cb = cbName()) => {
  return new Promise((resolve, reject) => {
    let obj = { ...par, cb };
    let keys = Object.keys(obj);
    let str = keys.map((k) => `${k}=${obj[k]}`);
    let src = `${url}?${str.join('&')}`;

    // 创建脚本并插入全局方法
    let script = document.createElement('script');
    script.src = src;

    let { body } = document;
    body.appendChild(script);

    // 响应时调用全局方法
    window[cb] = function(data) {
      resolve(data); // 回调数据
      body.removeChild(script); // 移除该脚本
      delete window[cb]; // 移除该全局方法
    };
  });
};
