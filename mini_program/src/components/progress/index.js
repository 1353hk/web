import c from '../../utils/console';
import numberGradient from '../../utils/num-gradient';

let timeId; // 定时器id

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  options: {
    multipleSlots: true,
  },
  externalClasses: ['myclass'],
  data: {
    leftScore: 0,
    rightScore: 0,
    position: 50,
  },
  properties: {
    myprop: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        clearTimeout(timeId);

        const left = newVal.left.score;
        const right = newVal.right.score;
        if (left === undefined || right === undefined) return;

        comp = this;

        let position;
        if (left == 0 && right == 0) {
          // 两边都为0时
          position = 50;
        } else {
          position = Math.floor((left / (left + right)) * 60) + 20;
        }

        let state;
        const oldPosition = comp.data.position;
        switch (true) {
          case position < oldPosition:
            state = 0;
            break;
          case position > oldPosition:
            state = 1;
            break;
          default:
            state = 2;
            break;
        }
        comp.setData({
          position,
          state,
        });

        // 左边得分渐变
        numberGradient(oldVal.left.score, left, (res) => {
          comp.setData({
            leftScore: res.num,
          });
        });
        // 右边得分渐变
        numberGradient(oldVal.right.score, right, (res) => {
          comp.setData({
            rightScore: res.num,
          });
        });

        timeId = setTimeout(() => {
          comp.setData({
            state: 2,
          });
        }, 2000);
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
    clearTimeout(timeId);
  },
  methods: {},
};

Component(compObj);
