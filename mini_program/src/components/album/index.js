/*

// 在页面中声明自定义组件
"usingComponents": {
  "my-base": "../../components/base/index",
}


// 使用自定义组件
<my-base class="" />
// 自定义属性, 用于在页面控制组件内元素元素
myprop=""


// 组件id, 用于触发组件内事件
id="base"
this.selectComponent('#base'); // 获取自定义组件对象


// 自定义事件, 用于触发页面内事件
bind:trigger=""
bindtap="trigger"
this.trigger(); // 自定义组件内触发页面事件
this.trigger(DATA); // 传递参数
this.trigger(null,true); // 冒泡触发事件


// 声明自定义组件中的抽象节点, 需在usingComponents中定义
generic:generic=""
// 在自定义组件中声明默认抽象节点
"componentGenerics":{
  "generic":{"default":""}
},

 */

import c from '../../utils/console';
import behavior from '../behavior';

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  behaviors: [behavior],
  externalClasses: ['myclass'],
  data: {},
  properties: {
    myprop: {
      type: Object,
      value: {},
      // observer(newVal, oldVal, changedPath) {
      //   if (!newVal) return;
      // },
    },
    list: {
      type: Array,
      value: [],
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
    previewImage(e) {
      const urls = this.data.list;
      const current = e.target.dataset.id; // 当前图片

      wx.previewImage({
        urls,
        current,
      });
    },
  },
};

Component(compObj);
