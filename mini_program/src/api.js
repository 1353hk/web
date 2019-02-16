import config from './config';
import c from './utils/console';
import system from './utils/system';
import md5 from './static/md5.min';

class Fun {
  constructor() {
    this.domain = config.domain; // 域名
    this.loginCount = 0; // 重新登录次数
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

  // 请求接口
  request(to, data, isGET, isLogin) {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: isMask,
    // });
    // wx.hideLoading();

    return new Promise((resolve, reject) => {
      const url = to;
      wx.request({
        url,
        data,
        method: isGET ? 'GET' : 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: (res) => {
          let err;
          const { data: response } = res;
          switch (response.code) {
            case 200:
              console.log('响应', url, response.data);
              resolve(response.data);
              return;

            case 500:
              err = response.message; // 普通错误，直接打印message作为提示语即可
              break;

            case 9999: {
              if (this.loginCount > 3) return;

              wx.showModal({
                title: '登录失败',
                content: response.message ? response.message : '后台发生错误',
                confirmText: '重新登录',
                success({ confirm }) {
                  if (confirm) {
                    this.apis('login').then(() => {
                      this.loginCount += 1;
                      this.request(to, data, isGET);
                    });
                  } else {
                    reject(response);
                  }
                },
              });

              return;
            }

            default:
              err = '未知错误';
              break;
          }

          wx.showToast({
            title: err,
            icon: 'none',
          });
          setTimeout(() => {
            reject(response);
          }, 1500);
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

  // 登陆后台
  login(url) {
    const sessionTime = wx.getStorageSync('sessionTime') || 0;
    if (Date.now() - sessionTime < 1000) return Promise.reject(new Error('登陆速度太快'));

    const sessionKey = system.sessionKey(
      (code) => {
        // 请求接口
        const request = this.request(url, {});
        return request.then((data) => {});
      },
      2592000000, // 30天过期
    );

    const prom = new Promise((resolve, reject) => {
      sessionKey.then(() => {});
    });

    return prom;
  }

  // 接口列表
  apis(api, data) {
    console.log('请求', api, data);

    let prom;
    switch (api) {
      // 模板
      case '': {
        /**
         * @param {}
         * @returns {}
         */
        prom = this.request(`${this.domain}/miniprogram`, data);
        break;
      }

      default: {
        throw new Error('无此api');
      }
    }

    return prom;
  }
}

const fun = new Fun();
export default fun.apis.bind(fun);
