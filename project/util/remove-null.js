const fun = {
  start(arg) {
    switch (arg.constructor) {
      case Object:
        return this.objFun(arg);
      case Array:
        return this.arrFun(arg);
      default:
        return arg;
    }
  },

  objFun(arg) {
    const keys = Object.keys(arg);
    const newObj = keys.reduce((p, key) => {
      const val = arg[key];
      if (val === undefined || val === null) return p;

      const obj = { ...p, [key]: this.start(val) };
      return obj;
    }, {});

    return newObj;
  },

  arrFun(arg) {
    const newArr = arg.reduce((p, v) => {
      if (v === undefined || v === null) return p;

      const obj = p;
      obj.push(this.start(v));
      return obj;
    }, []);
    return newArr;
  },
};

module.exports = fun.start.bind(fun);
