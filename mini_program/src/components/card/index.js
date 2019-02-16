/*

{
  "usingComponents": {
    "my-base": "../../components/base/index",
  }
}

<my-base class="" />;

// 自定义属性, 用于在页面控制组件内元素元素
myprop="";

// 自定义事件, 用于触发页面内事件
bind:trigger="";

// 组件id, 用于触发组件内事件
id="base";
this.selectComponent('#base');

 */

import c from '../../utils/console';
import behavior from '../behavior';

const constellations = [
  {
    name: '',
    bg: '',
  },
  {
    name: '水瓶座',
    bg: '#80205C',
  },
  {
    name: '双鱼座',
    bg: '#D068B3',
  },
  {
    name: '白羊座',
    bg: '#E51520',
  },
  {
    name: '金牛座',
    bg: '#D4470D',
  },
  {
    name: '双子座',
    bg: '#FE7B00',
  },
  {
    name: '巨蟹座',
    bg: '#DB9E38',
  },
  {
    name: '狮子座',
    bg: '#FECB00',
  },
  {
    name: '处女座',
    bg: '#A4C735',
  },
  {
    name: '天秤座',
    bg: '#058727',
  },
  {
    name: '天蝎座',
    bg: '#179F79',
  },
  {
    name: '射手座',
    bg: '#334298',
  },
  {
    name: '摩羯座',
    bg: '#7041B2',
  },
];

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  behaviors: [behavior],
  externalClasses: ['myclass'],
  data: {
    constellation: {}, // 星座
  },
  properties: {
    myprop: {
      type: Object,
      value: {},
      // observer(newVal, oldVal, changedPath) {
      //   if (!newVal) return;
      // },
    },
    msg: {
      type: Object,
      value: {},
      observer(newVal) {
        if (!newVal.user_id) return;

        // 图片
        const imgs = newVal.image_list.map(i => i.url);
        this.setData({ imgs });

        const index = newVal.constellation; // 获取星座索引
        if (index) {
          // 已编辑生日
          const constellation = constellations[index]; // 星座
          this.setData({ constellation });
        }
      },
    },
    swiper: {
      type: Boolean,
      value: false,
    },
  },
  created() {
    comp = this;
  },
  attached() {},
  detached() {},
  lifetimes: {
    // created() {},
    // attached() {},
    // detached() {},
  },
  pageLifetimes: {
    show() {},
    hide() {},
  },
  methods: {
    // 预览图片
    previewImage() {
      let urls;
      const { head, image_list: imgs } = this.data.msg;
      if (head) {
        urls = [head];
      } else {
        urls = imgs[0].url;
      }
      wx.previewImage({ urls });
    },
  },
};

Component(compObj);
