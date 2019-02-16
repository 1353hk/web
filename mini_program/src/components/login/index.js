import c from '../../utils/console';

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  options: {
    multipleSlots: true,
  },
  externalClasses: ['myclass'],
  data: {},
  properties: {
    myprop: {
      type: Object,
      value: {},
      observer() {},
    },
    url: {
      type: String,
    },
    mymeth: {
      type: Object,
      value: {},
      observer(newVal) {
        if (!newVal) return;
        const meth = this[newVal.name];
        if (meth) meth(newVal.data);
      },
    },
  },
  attached() {
    comp = this;
    this.setData({
      userInfo: appData.userInfo,
    });

    // 直接登陆, 暂时目前仍然可用
    wx.getUserInfo({
      lang: 'zh_CN',
      success: res => this.login({ detail: res }),
    });
  },
  detached() {},
  methods: {
    trigger(e, isBubble) {
      let opt;
      if (isBubble) {
        opt = { bubbles: true, composed: true };
      } else {
        opt = {};
      }

      this.triggerEvent('trigger', e, opt);
    },

    login(e) {
      wx.showLoading({ title: '正在登陆' });
      this.getLoginCode()
        .then((res) => {
          const { detail } = e;
          if (detail.userInfo) {
            return this.request(this.data.url, {
              code: res,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature,
              encryptedData: detail.encryptedData,
            });
          }

          return Promise.reject(new Error('拒绝授权'));
        })
        .then((res) => {
          wx.hideLoading();
          this.trigger(res, 1);
        })
        .catch((err) => {
          wx.hideLoading();
          wx.showModal({
            title: '登陆失败',
            content: err.m ? err.m : err.message,
            confirmText: '重新登陆',
            success(res) {
              if (res.confirm) comp.login(e);
            },
          });
          console.log('登陆失败', err);
        });
    },

    getLoginCode() {
      return new Promise((resolve, reject) => {
        wx.login({
          success(res) {
            const { code } = res;
            wx.setStorageSync('loginCode', code);
            resolve(code);
          },
          fail: reject,
        });
      });
    },

    request(url, msg) {
      return new Promise((resolve, reject) => {
        wx.request({
          url,
          data: msg,
          success: resolve,
          fail: reject,
        });
      }).then(res =>
        new Promise((resolve, reject) => {
          const { data, header } = res;
          switch (+data.c) {
            case 0: {
              const date = new Date().toDateString();
              const dateStr = Date.parse(date);
              wx.setStorageSync('loginTime', dateStr);

              const setCookie = header['Set-Cookie'] || header['set-cookie'];
              const cookie = setCookie.match(/ci_session=\w+/)[0];
              wx.setStorageSync('cookie', cookie);
              resolve(cookie);
              break;
            }

            default:
              reject(data);
              break;
          }
        }));
    },
  },
};

Component(compObj);
