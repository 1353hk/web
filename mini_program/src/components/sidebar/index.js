import c from '../../utils/console';

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  options: {
    multipleSlots: true,
  },
  externalClasses: ['myclass'],
  data: {
    isOpen: false, // 是否展开
  },
  properties: {
    myprop: {
      type: Object,
      value: {},
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

    list: {
      type: Array,
      value: [],
    },
  },
  created() {
    comp = this;
  },
  attached() {
    this.setData({
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

    // 开关
    switch() {
      const isOpen = !this.data.isOpen;
      this.setData({ isOpen });
    },
  },
};

Component(compObj);
