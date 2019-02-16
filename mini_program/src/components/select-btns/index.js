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
    click({ target }) {
      const { type } = target.dataset;
      if (type !== undefined) this.trigger(+type);
    },
  },
};

Component(compObj);
