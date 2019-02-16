import config from './config';
import c from './utils/console';

class Fun {
  // 请求接口
  static request(url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        header: {},
        success(res) {
          const { data: response } = res;
          console.log('响应', url, response);
        },
        fail(res) {
          console.error(url, res);

          const { trace } = console;
          if (trace) trace('请求失败');

          wx.showToast({
            title: '网络错误',
            icon: 'none',
          });
          setTimeout(() => {
            reject(res);
          }, 1500);
        },
      });
    });
  }
  /*
  static request(url, msg, isMask = false) {
    wx.showLoading({
      title: '加载中',
      mask: isMask,
    });

    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data: {
          ...msg,
          code: wx.getStorageSync('loginCode'),
        },
        header: {
          cookie: wx.getStorageSync('cookie') || '',
        },
        success(res) {
          const { data, header } = res;
          switch (+data.c) {
            // 请求成功
            case 0: {
              const setCookie = header['Set-Cookie'] || header['set-cookie'];
              if (setCookie) {
                const cookie = setCookie.match(/ci_session=\w+/)[0];
                wx.setStorageSync('cookie', cookie);
              }

              resolve(data.d);
              break;
            }

            // 未登陆
            case 100: {
              console.error('未登陆');

              reject(data);

              // const app = getApp();
              // app.login();

              const pages = getCurrentPages();
              const page = pages[pages.length - 1];
              if (page.route === 'pages/index/index') return;

              wx.showModal({
                content: data.m,
                showCancel: false,
                confirmText: '回到首页',
                success({ confirm }) {
                  if (confirm) wx.reLaunch({ url: '/pages/index/index' });
                },
              });

              break;
            }

            default:
              wx.showModal({
                title: '登陆失败',
                content: data.m ? data.m : '后台发生错误',
                confirmText: '重新登陆',
                success({ confirm }) {
                  if (confirm) {
                    this.request(url, msg).then(resolve);
                  } else {
                    reject(data);
                  }
                },
              });

              break;
          }

          wx.hideLoading();
        },
        fail(res) {
          console.error(url, res);
          console.trace('请求失败');

          wx.hideLoading();
          wx.showToast({
            title: '网络错误',
            icon: 'none',
          });
          setTimeout(() => {
            reject(res);
          }, 1500);
        },
      });
    });
  }
  */

  // 登陆后台
  login(url) {
    const loginTime = wx.getStorageSync('loginTime') || 0;
    if (Date.now() - loginTime < 1000) return Promise.reject(new Error('登陆速度太快'));

    return this.getLoginCode()
      .then(this.getUserInfo)
      .then(res => this.request(url, res))
      .then((res) => {
        wx.hideLoading();
        wx.setStorageSync('loginTime', Date.now());

        const { user } = res;
        console.log('登陆成功', user);
        return user;
      })
      .catch((res) => {
        wx.hideLoading();
        console.error('登陆失败', res);
        return Promise.reject(res);
      });
  }

  // Socket
  socket(type, opt) {
    const that = this;
    switch (type) {
      case 'init': {
        const { onError, onClose, onMessage } = opt;
        wx.onSocketError((res) => {
          console.log('Socket 失败', res);
          that.data.socketOpened = false;
          if (onError) onError(res);
        });

        wx.onSocketClose((res) => {
          console.log('Socket 已关闭', res);
          that.data.socketOpened = false;
          if (onClose) onClose(res);
        });

        wx.onSocketMessage((res) => {
          const data = JSON.parse(res.data);
          console.log('Socket 响应', data);
          if (onMessage) onMessage(data);
        });

        return Promise.resolve();
      }

      case 'connect': {
        return new Promise((resolve, reject) => {
          that.socket('close', {
            reason: '初始化',
          });
          wx.connectSocket({
            url: this.domainWs,
            success(res) {
              console.log('Socket 成功', res);
            },
            fail(res) {
              console.log('Socket 失败', res);
              reject(res);
            },
          });

          wx.onSocketOpen((res) => {
            console.log('Socket 已打开', res);
            that.data.socketOpened = true;
            resolve(res);
          });
        });
      }

      case 'message': {
        console.log('Socket 请求', opt);
        return new Promise((resolve, reject) => {
          if (that.data.socketOpened) {
            wx.sendSocketMessage({
              data: JSON.stringify({
                token: wx.getStorageSync('cookie').match(/ci_session=(\w+)/)[1],
                ...opt,
              }),
              success(res) {
                resolve(res);
              },
              fail(res) {
                reject(res);
              },
            });
          } else {
            reject();
          }
        });
      }

      case 'close': {
        console.log('Socket 关闭', opt);
        return new Promise((resolve, reject) => {
          if (that.data.socketOpened) {
            that.data.socketCloseMsg = opt.reason;

            wx.closeSocket({
              code: opt.code,
              reason: opt.reason,
              success(res) {
                that.data.socketOpened = false;
                resolve(res);
              },
              fail: reject,
            });
          } else {
            resolve();
          }
        });
      }

      case 'reconnect': {
        const { socketFail } = that.data;
        if (socketFail) {
          that.data.socketFail += 1;
        } else {
          that.data.socketFail = 1;
        }

        console.log(`Socket 连接失败${socketFail}次`);
        // if (socketFail > 2) return;

        return Promise.resolve();
      }

      default:
        return Promise.reject();
    }
  }
}

const { domain } = config;
export default (api, data) => {
  console.log('请求', api, data);

  let prom;

  switch (api) {
    case '': {
      prom = Fun.request(`${domain}/${api}`, data);
      break;
    }

    default: {
      throw new Error('无此api');
    }
  }

  return prom;
};
