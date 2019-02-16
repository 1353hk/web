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


<my-movable
  generic:generic="my-card"
  list="{{list}}"
></my-movable>

bind:click="click"
bind:select="select"

 */

import c from '../../utils/console';
import behavior from '../behavior';
import lifecycle from './lifecycle';

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  behaviors: [behavior, lifecycle],
  externalClasses: ['myclass'],
  data: {
    x: 0,
    y: 0,
  },
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
      observer(newVal) {
        if (!newVal.length) return;

        // 重置位置
        comp.setData({
          myList: [...newVal],
          x: 0,
          y: 0,
        });
      },
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
    // 触摸
    touchstart({ changedTouches }) {
      const touche = changedTouches[0];
      this.position = touche; // 保存开始位置
    },

    // 放开
    touchend({ changedTouches }) {
      const touche = changedTouches[0];
      const { position } = this;
      if (!position.pageX) return;

      const x = position.pageX - touche.pageX; // 获取移动距离
      switch (true) {
        // 无视
        case x >= 50: {
          this.direction(0);
          break;
        }

        // 喜欢
        case x <= -50: {
          this.direction(1);
          break;
        }

        // 归0
        default: {
          this.setData({
            x: 0,
            y: 0,
          });
          break;
        }
      }
    },

    // 移动方向
    direction(isLike) {
      const isStop = this.isStop(isLike);
      if (isStop) {
        this.setData({
          x: 0,
          y: 0,
        });
      } else {
        this.setData({
          x: isLike ? 750 : -750,
          y: 0,
        });
        this.select({ detail: isLike });
      }
    },

    // 选择
    select({ detail }) {
      const { list } = this.data;
      const item = list[list.length - 1];

      // 动画延迟
      setTimeout(() => {
        this.trigger({
          trigger: 'select',
          msg: item,
          isLike: detail,
        });
      }, 150);
    },

    // 点击
    click() {
      const { list } = this.data;
      const item = list[list.length - 1];
      this.trigger({
        trigger: 'click',
        msg: item,
      });
    },
  },
};

Component(compObj);
