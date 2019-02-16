/*

<my-barrage class="" myProp="{{barrageObj}}"></my-barrage>

that.setData({
  barrageObj: {
    height: 50,
    type: 1,
    list: res.help_list.map(i => {
      if (i.is_right) {
        return {
          img: i.avatar,
          text: i.answer,
        };
      }
    }),
  },
});

*/

import c from '../../utils/console';

let id = 0; // 用做唯一的wx:key
let height;

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  options: {
    multipleSlots: true,
  },
  data: {
    bg: '',
    color: '',
    barrageList: [],
  },
  properties: {
    myProp: {
      type: Object,
      value: {
        height: 100,
        type: 0,
        list: [],
      },
      observer(newVal) {
        if (!newVal || !newVal.list.length) return;
        comp = this;

        height = newVal.height - 5;

        let bg;
        let color;
        switch (newVal.type) {
          case 1:
            bg = 'rgba(255, 255, 255, 0.7)';
            color = '#444444';
            break;

          default:
            bg = 'rgba(0, 0, 0, 0.6)';
            color = '#ffffff';
            break;
        }

        comp.setData({
          bg,
          color,
        });
        comp.start(0);
      },
    },
  },
  attached() {
    comp = this;
  },
  detached() {
    comp.setData({
      barrageList: [],
    });
  },
  methods: {
    start(count) {
      const { myProp, barrageList } = comp.data;

      const { list } = myProp;
      const item = list[count];

      if (barrageList.length > 2) barrageList.shift();

      barrageList.push({
        id: id++,
        icon: item.icon,
        img: item.img,
        text: item.text,
        top: Math.floor(Math.random() * height),
        time: 4,
      });
      comp.setData({ barrageList });

      count += 1;
      if (count >= list.length) count = 0;
      setTimeout(() => {
        comp.start(count);
      }, 1000);
    },
  },
};

Component(compObj);
