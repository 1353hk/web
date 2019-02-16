import c from '../../utils/console';

const app = getApp();
const appData = app.data;
let page;

const pageObj = {
  data: {
    mask: {},
  },

  navigate: app.navigate,
  toggleMask: app.toggleMask,
  onPullDownRefresh: app.pullDownRefresh,
  onShareAppMessage(res) {
    const opt = {
      from: res.from,
      target: res.target,
      title: '',
      imageUrl: '',
      path: '',
    };
    return app.shareAppMessage(opt);
  },

  onLoad(options) {
    page = this;
    app.pageLoad(this);
  },
  onShow() {
    app.pageShow(this);
  },
};

Page(pageObj);
