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
    list: [],
  },
  properties: {
    myprop: {
      type: Object,
      value: {},
      // observer(newVal, oldVal, changedPath) {
      //   if (!newVal) return;
      // },
    },
    img: {
      type: String,
      value: '',
    },
    hidden: {
      type: Array,
      value: [],
      observer(newVal) {
        if (!newVal) return;

        // 如果进入下一题
        if (newVal.length === 0) this.setData({ anime: false });

        // 创建遮罩层
        const list = [];
        for (let i = 0; i < 4; i += 1) {
          list.push({ id: i, isHide: false });
        }

        // 根据传入数据隐藏遮罩层
        newVal.forEach((i) => {
          list[i].isHide = true;
        });

        this.setData({
          userInfo: appData.userInfo,
          list,
          anime: true,
        });
      },
    },
    disable: {
      type: Boolean,
      value: false,
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
  },
  detached() {},
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
    uncover(e) {
      const { list, hidden, disable } = this.data;
      if (disable) return;

      const { id } = e.target.dataset;
      const item = list[id];
      const { isHide } = item;

      // 如果未揭开
      if (!isHide) {
        item.isHide = true;
        this.setData({ list });

        hidden.push(id);
        this.trigger(hidden);
      }
    },
  },
};

Component(compObj);
