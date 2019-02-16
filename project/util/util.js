module.exports = {
  speed(fun, time = 1e7) {
    console.time('speed');
    // for (; time--; fun());
    // for (let i = time - 1; i; i -= 1) fun();
    for (let i = 0; i < time; i += 1) fun();
    console.timeEnd('speed');
  },

  // 是否数值
  validateNumber(n) {
    return !Number.isNaN(parseFloat(n)) && Number.isFinite(n) && Number(n) == n;
  },

  /* 是否奇数 */
  isOdd(num) {
    return num % 2 === 1;
  },

  /* 是否偶数 */
  isEven(num) {
    return num % 2 === 0;
  },

  /* 是否能整除 */
  isDivisible(dividend, divisor) {
    return dividend % divisor === 0;
  },

  /**
   * @desc   判断是否为手机号
   * @param  {String|Number} arg
   * @return {Boolean}
   */
  isPhone(arg) {
    const index = arg.search(
      /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    );
    return index !== -1;
  },
  isPhoneNum(arg) {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(arg);
  },

  /**
   * @desc   判断是否为邮箱地址
   * @param  {String}  arg
   * @return {Boolean}
   */
  isEmail(arg) {
    const index = arg.search(/^([a-z0-9]+[-_.]?[a-z0-9]+)*@([a-z0-9]+)\.([a-z0-9]{1,})$/i);
    return index !== -1;
  },
  isEmail2(arg) {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(arg);
  },

  /**
   * @desc  判断是否为身份证号
   * @param  {String|Number} arg
   * @return {Boolean}
   */
  isIDCard(arg) {
    const index = arg.search(/(^\d{15}$)|(^\d{17}([0-9]|X))$/);
    return index !== -1;
  },
  isIdCard(arg) {
    const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    return reg.test(arg);
  },

  /**
   * @desc   判断是否为URL地址
   * @param  {String} srt
   * @return {Boolean}
   */
  isUrl(srt) {
    const reg = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/i;
    return reg.test(srt);
  },

  /**
   * @desc   判断`obj`是否为空
   * @param  {Object} obj
   * @return {Boolean}
   */
  isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;

    return !Object.keys(obj).length;
  },

  // 两点之间的距离
  distance(x0, y0, x1, y1) {
    return Math.hypot(x1 - x0, y1 - y0);
  },

  // 阶乘
  factorial(n) {
    return n <= 1 ? 1 : n * this.factorial(n - 1);
  },

  /* 最大公约数（GCD） */
  gcd(x, y) {
    return !y ? x : this.gcd(y, x % y);
  },

  /**
   * @desc 生成指定范围随机数
   * @param  {Number} min
   * @param  {Number} max
   * @return {Number}
   */
  randomNum(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /* 转义正则表达式 */
  escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  /* 首字母大写 */
  capitalize(str, lowerRest = false) {
    return str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
  },

  /* 大写每个单词的首字母 */
  capitalizeEveryWord(str) {
    return str.replace(/\b[a-z]/g, char => char.toUpperCase());
  },

  /* 字串补0 */
  zeroize(val, num) {
    const str = Array(num).join('0') + val;
    str.slice(-num);
  },

  // 反转一个字符串
  reverseStr(str) {
    return [...str].reverse().join('');
  },

  /* 字串排序 */
  sortCharactersInString(str) {
    return str
      .split('')
      .sort((a, b) => a.localeCompare(b))
      .join('');
  },

  /* 数组元素乱序 */
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  },

  /* 数组总和 */
  sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
  },

  /* 数组平均数 */
  average(arr) {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
  },

  /* 计数数组中值的出现次数 */
  countOccurrences(arr, value) {
    return arr.reduce((a, v) => (v === value ? a + 1 : a + 0), 0);
  },

  /* 从数组中获取最大值 */
  arrayMax(arr) {
    return Math.max(...arr);
  },

  /* 从数组中获取最小值 */
  arrayMin(arr) {
    return Math.min(...arr);
  },

  /* 二维数组扁平化 */
  flatten(arr) {
    return arr.reduce((a, v) => a.concat(v), []);
  },

  /* 多维数组扁平化 */
  flattenDeep(arr) {
    return arr.reduce((a, v) => a.concat(Array.isArray(v) ? this.flattenDeep(v) : v), []);
  },

  /* 交集 */
  intersection(arr, values) {
    return arr.filter(v => values.includes(v));
  },

  /* 数组之间的区别 */
  difference(arr, ...arg) {
    const set = new Set([].concat(...arg));
    return arr.filter(x => !set.has(x));
  },

  /* 数组中的唯一值 */
  uniq(arr) {
    return [...new Set(arr)];
  },

  /* 数组中的非唯一值 */
  nonUniq(arr) {
    return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
  },

  /* 幂集 */
  powerset(arr) {
    return arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
  },

  /* 用值初始化数组 */
  initializeArray(n, value = 0) {
    return Array(n).fill(value);
  },

  /* 斐波那契数组生成器 */
  fibonacci(n) {
    Array(n)
      .fill(0)
      .reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
  },

  /* JsonToMap(json) {
    const obj = JSON.parse(json);
    const map = new Map();

    const keys = Object.keys(obj);
    keys.forEach(k => map.set(k, obj[k]));

    return map;
  },
  MapToJson(map) {
    const obj = Object.create(null);
    map.forEach((v, k) => {
      obj[k] = v;
    });
    return JSON.stringify(obj);
  }, */
  ObjToMap(obj) {
    const map = new Map();

    const keys = Object.keys(obj);
    keys.forEach(k => map.set(k, obj[k]));

    return map;
  },
  MapToObj(map) {
    const obj = Object.create(null);
    map.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  },

  /* 来自键值对数组的对象 */
  fromPairs(arr) {
    return arr.reduce((p, [k, v]) => ({ ...p, [k]: v }), {});
  },

  /* 柯里化 */
  curry(fun, arity = fun.length, ...args) {
    return arity <= args.length ? fun(...args) : this.curry.bind(this, fun, arity, ...args);
  },

  /* 管道 */
  pipe(...funcs) {
    return arg => funcs.reduce((acc, func) => func(acc), arg);
  },

  /* UUID生成器 */
  uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
  },
};
