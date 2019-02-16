import c from '../../utils/console.js';

let app = getApp();
let appData = app.data;
let comp;

let compObj = {
  data: {
    userInfo: {}, //用户信息
  },
  attached() {
    comp = this;

    // 获取用户信息
    app.getUserInfo().then(res => {
      comp.setData({
        userInfo: res.userInfo,
      });
    });
  },
  methods: {},
};

Component(compObj);
