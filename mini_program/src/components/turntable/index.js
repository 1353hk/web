import c from '../../utils/console';

let isRun = false;
const duration = 3000;

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  options: {
    multipleSlots: true,
  },
  externalClasses: ['myclass'],
  data: {},
  properties: {
    // myprop: {
    //   type: Object,
    //   value: {},
    //   observer(newVal, oldVal, changedPath) {
    //     if (!newVal) return;
    //   },
    // },

    img: {
      type: String,
      value: '',
    },

    num: {
      type: Number,
      value: 0,
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
  detached() {},
  methods: {
    trigger(e = {}, isBubble) {
      const target = e.currentTarget;
      const data = target ? target.dataset : e;
      const {
        trigger = 'trigger', bubbles, composed, capturePhase,
      } = data;

      let opt;
      if (isBubble) {
        opt = { bubbles: true, composed: true };
      } else {
        opt = {
          bubbles,
          composed,
          capturePhase,
        };
      }

      this.triggerEvent(trigger, data, opt);
    },

    start(index) {
      if (isRun) return; // 如果正在旋转则终止
      isRun = true;

      // const { num } = comp.data;
      // if (num) {
      // } else {
      //   // 如果没有次数
      //   comp.trigger({ success: false });
      // }

      // 如果有次数
      const list = [
        { name: 'a', pr: 0.1 },
        { name: 'b', pr: 0.2 },
        { name: 'c', pr: 0.3 },
        { name: 'd', pr: 0.4 },
        { name: 'e', pr: 0.4 },
        { name: 'f', pr: 0.4 },
      ];

      // 计算每个奖项的角度范围
      const deg = 1 / list.length;
      const rotate = deg * index * 360;

      const animation = wx
        .createAnimation({
          duration,
          timingFunction: 'ease-in-out',
        })
        .rotate(1800 + rotate)
        .step()
        .export();
      comp.setData({ animation });

      setTimeout(() => {
        comp.trigger({ success: true });
        comp.end();
      }, duration + 500);
    },

    end() {
      const animation = wx
        .createAnimation({
          duration: 0,
        })
        .rotate(0)
        .step()
        .export();
      comp.setData({ animation });
      isRun = false;
    },
  },
};

Component(compObj);
