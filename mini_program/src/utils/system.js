// 代理
const proxy = (source = {}) => new Proxy(source, {
  get(obj, key) {
    return obj[key];
  },
  set(obj, key, val) {
    const state = obj;
    state[key] = val;

    // 渲染数据
    const pages = getCurrentPages();
    pages.forEach(page => page.setData({ state }));

    // 本地存储
    wx.setStorage({
      key: 'userData',
      data: state,
    });

    return state;
  },
});

const fun = {
  // 权限
  setting(key, isAuthorize) {
    return new Promise((resolve, reject) => {
      // 获取设置
      wx.getSetting({
        success: ({ authSetting }) => {
          const scope = `scope.${key}`;
          const setting = authSetting[scope];
          if (setting === true) {
            // 已授权
            resolve(true);
          } else if (setting === false) {
            // 拒绝授权
            reject();
          } else if (isAuthorize) {
            // 发起授权请求
            wx.authorize({
              scope,
              success: () => {
                resolve(true);
              },
              fail: () => {
                resolve(false);
              },
            });
          } else {
            // 未授权
            resolve(false);
          }
        },
      });
    });
  },

  // 个人设置
  mySetting(id, set) {
    const setting = wx.getStorageSync('setting') || {};
    if (id === undefined) return setting;
    if (set === undefined) return setting[id];

    setting[id] = set;
    wx.setStorageSync('setting', setting);
    return set;
  },
  mySettingSwitch(e) {
    const { id } = e.currentTarget.dataset;
    const setting = wx.getStorageSync('setting');
    setting[id] = !setting[id];
    wx.setStorageSync('setting', setting);
    this.setData({ setting });
  },

  // 今天计数
  todayCount(key) {
    const today = new Date().toDateString(); // 今天日期

    const storage = wx.getStorageSync(key) || {};
    if (storage.time === today) {
      // 同一天
      storage.count += 1;
    } else {
      // 第二天
      storage.time = today;
      storage.count = 1;
    }

    wx.setStorageSync(key, storage);
    return storage.count; // 返回计数
  },

  // 本地存储
  storage(key, cb) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success: ({ data }) => {
          // 有本地存储
          resolve(data);
        },
        fail: () => {
          if (cb) {
            // 进行本地存储
            cb((res) => {
              wx.setStorage({
                key,
                data: res,
                success: () => {
                  resolve(res);
                },
              });
            });
          } else {
            // 无本地存储
            reject(new Error(`无此本地存储: ${key}`));
          }
        },
      });
    });
  },

  // 获取登录凭证
  loginCode(isCache) {
    return new Promise((resolve) => {
      const login = (cb) => {
        wx.login({
          success: ({ code }) => {
            cb(code);
          },
        });
      };

      // 是否使用缓存
      if (isCache) {
        // 获取登录凭证本地存储
        const prom = () => this.storage('loginCode', login);

        // 检查登录凭证是否过期
        wx.checkSession({
          success: () => {
            prom().then(resolve);
          },
          fail: () => {
            // 重置登录凭证
            wx.removeStorage({
              key: 'loginCode',
              success: () => {
                prom().then(resolve);
              },
            });
          },
        });
      } else {
        login(resolve);
      }
    });
  },

  // 获取登录时间
  sessionTime(time) {
    const now = Date.now();
    const sessionTime = this.storage('sessionTime', (cb) => {
      cb(now);
    });
    return sessionTime.then((res) => {
      const differ = now < time + res; // 判断登录态是否有效
      return differ;
    });
  },

  // 获取登录态, 默认7天过期
  sessionKey(request, time = 604800000) {
    return new Promise((resolve, reject) => {
      // 获取登录时间
      this.sessionTime(time).then((res) => {
        // 登录态过期
        if (!res) {
          wx.removeStorageSync('sessionTime'); // 重置登录时间
          wx.removeStorageSync('sessionKey'); // 重置登录态
        }

        // 获取登录态本地存储
        const sessionKey = this.storage('sessionKey', (cb) => {
          // 获取登录凭证
          this.loginCode()
            .then(request) // 请求后台登录接口
            .then((key) => {
              if (!key) throw new Error('无sessionKey');

              cb(key); // 保存登录凭证
              this.sessionTime(time); // 保存登录时间
            })
            // 登录失败
            .catch((err) => {
              console.error(new Error('登录失败'));
              reject(err);
            });
        });
        sessionKey.then(resolve);
      });
    });
  },

  // 页面导航
  navigate(e) {
    // 简单跳转
    if (typeof e === 'string') {
      wx.navigateTo({ url: `/pages/${e}/index` });
      return '';
    }

    const target = e.currentTarget;
    const data = target ? target.dataset : e;
    const { to } = data;

    let mode;
    switch (`${data.mode}`) {
      case '1':
      case 'redirect':
      case 'redirectTo':
        mode = 'redirectTo';
        break;

      case '2':
      case 'reLaunch':
        mode = 'reLaunch';
        break;

      case '3':
      case 'switchTab':
        mode = 'switchTab';
        break;

      case '4':
      case 'navigateBack':
        mode = 'navigateBack';
        break;

      default:
        mode = 'navigateTo';
        break;
    }

    const querys = [];
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (key === 'to' || key === 'mode' || key === 'delta') return;

      const element = data[key];
      querys.push(`${key}=${element}`);
    });
    const query = querys.length ? `?${querys.join('&')}` : '';

    wx[mode]({
      url: `/pages/${to}/index${query}`,
      delta: data.delta,
    });

    return query;
  },

  // 返回首页
  toIndex(query) {
    wx.reLaunch({ url: `/pages/index/index${query || ''}` });
  },

  // 下拉刷新
  pullDownRefresh() {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    page.onLoad(page.data.options);
    page.onShow();
    wx.stopPullDownRefresh();
  },

  // 切换遮罩
  toggleMask(arg) {
    let id;
    if (typeof arg === 'object') {
      ({ id } = arg.currentTarget.dataset);
    } else {
      id = arg;
    }

    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    const toggle = !page.data.mask[id];
    page.setData({ [`mask.${id}`]: toggle });
  },

  // 状态管理
  state: proxy(),
  setState(source) {
    this.state = proxy(source);
  },
};

export default fun;
