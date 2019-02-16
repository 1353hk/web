import c from '../../utils/console';

const app = getApp();
const appData = app.data;
let page;

const pageObj = {
  data: {
    options: {},
    url: '',
  },

  onLoad(opt) {
    page = this;
    page.setData({
      options: opt,
    });

    app.pageLoad(page).then((res) => {});

    switch (opt.type) {
      // 广告
      case 'advert':
        app.getConfig.then(res => page.setData({ url: res.index_banner_link }));
        break;

      default:
        break;
    }
  },
  onShow() {
    app.pageShow(page).then((res) => {});
  },

  onShareAppMessage(res) {
    const opt = {
      from: res.from,
      target: res.target,
      title: '',
      imageUrl: '',
      path: '',
      success(res) {},
      fail(res) {},
    };
    return app.shareAppMessage(opt);
  },
  onPullDownRefresh() {
    app.pullDownRefresh();
  },
};

Page(pageObj);
