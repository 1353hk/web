module.exports = {
  getCookie(key) {
    const { cookie } = window.document;
    if (cookie) {
      if (!key) {
        const arr = cookie.split('; ');
        const obj = {};
        let kv;
        for (let i = arr.length; i--;) {
          kv = arr[i].split('=');
          obj[kv[0]] = unescape(kv[1]);
        }
        return obj;
      }
      const val = cookie.match(new RegExp(`\\b${key}=([^;]+)`));
      return val ? unescape(val[1]) : null;
    }
    return null;
  },

  setCookie(k, v, e, p) {
    let t;
    if (!e) {
      t = '';
    } else {
      t = new Date();
      t.setMonth(t.getMonth() + +e);
    }
    if (!p) {
      p = '/';
    }
    window.document.cookie = `${k}=${escape(v)};expires=${t};path=${p}`;
  },

  delCookie(k, p) {
    if (!p) {
      p = '/';
    }
    window.document.cookie = `${k}=;expires=${new Date()};path=${p}`;
  },
};
