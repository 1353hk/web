/*
<my-count-down-ms class=""></my-count-down-ms>
<my-count-down-ms class="" time=""></my-count-down-ms>
<my-count-down-ms class="" mymeth="{{countDown}}" bind:trigger=""></my-count-down-ms>


this.setData({
  countDown: {
    name: 'start',//开始倒数
    name: 'getTime',//获取时间
  },
});
*/

import c from '../../utils/console';

let timeId;

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  options: {
    multipleSlots: true,
  },
  externalClasses: ['myclass'],
  data: {
    pct: 100, // 进度
    ms: '', // 倒数
  },
  properties: {
    myprop: {
      type: Object,
      value: {},
      // observer(newVal, oldVal, changedPath) {
      //   if (!newVal) return;
      // },
    },
    time: {
      type: Number,
      value: 3600,
      // observer(newVal, oldVal, changedPath) {
      //   if (!newVal) return;
      // },
    },
    mymeth: {
      type: Object,
      value: {},
      observer(newVal) {
        if (!newVal) return;
        const meth = this[newVal.name];
        if (meth) meth(newVal.data);
      },
    },
  },
  attached() {
    comp = this;
    comp.setData({
      userInfo: appData.userInfo,
    });
  },
  detached() {
    clearInterval(timeId);
  },
  methods: {
    trigger(e, isBubble) {
      let opt;
      if (isBubble) {
        opt = { bubbles: true, composed: true };
      } else {
        opt = {};
      }
      this.triggerEvent('trigger', e, opt);
    },

    start(start) {
      clearInterval(timeId);
      const { time } = comp.data;
      timeId = setInterval(() => {
        let ms;
        let pct;
        const differ = Date.now() - start; // 获取相差毫秒
        const second = time * 1000 - differ; // 获取倒数毫秒
        if (second <= 1000) {
          // 如果倒数结束
          clearInterval(timeId);
          ms = '00:00';
          pct = 0;
        } else {
          // 如果倒数继续
          const date = new Date(second);
          const timeStr = date.toJSON();
          ms = timeStr.match(/T\d\d:(.+)\./)[1]; // 获取分和秒
          pct = (second / (time * 10)).toFixed(2); // 计算倒数进度
        }

        comp.setData({
          ms,
          pct,
        });

        comp.getTime(); // 触发事件

        // let s = ms.slice(3); //获取秒数
        // if (s === '00') comp.getTime(); //触发事件

        // if (!pct) comp.getTime(); //倒数结束
      }, 1000);
    },

    getTime() {
      const { data } = comp;
      comp.trigger({
        ms: data.ms,
        pct: data.pct,
      });
    },
  },
};

Component(compObj);
