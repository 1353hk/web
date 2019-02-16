module.exports = (key) => {
  const query = window.location.search;
  if (query) {
    if (!key) {
      const arr = query.slice(1).split('&');
      const obj = {};
      let kv;
      for (let i = arr.length; i--;) {
        kv = arr[i].split('=');
        obj[kv[0]] = unescape(kv[1]);
      }
      return obj;
    }
    const val = query.match(new RegExp(`(?:\\?|&)${key}=([^&]+)`));
    return val ? unescape(val[1]) : null;
  }
  return null;
};
