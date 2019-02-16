import config from './config';
import api from './api';

import c from './utils/console';
import system from './utils/system';

let app;
let page;

const appObj = {
  data: {
    ...config,
  },

  api, // 接口
  ...system,

  onLaunch(options) {
    app = this;
  },
  onShow(options) {},
  onHide() {},

  pageLoad(that) {
    that.setData({
      options: that.options,
      state: this.state,
    });
  },
  pageShow(that) {
    page = that;
  },

  // 分享
  shareAppMessage(opt) {
    console.log('分享', opt.path);

    return {
      title: opt.title,
      imageUrl: opt.imageUrl,
      path: opt.path || '/pages/index/index',
    };
  },
};

App(appObj);
