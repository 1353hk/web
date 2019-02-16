/*

<my-mask></my-mask>

<my-mask hidden="{{}}"></my-mask>
<my-mask hidden="{{}}">
  <view></view>
</my-mask>

// 背景
<my-mask hidden="{{}}" bg="none"></my-mask>
<my-mask hidden="{{}}" bg="white"></my-mask>

// 动画
<my-mask hidden="{{}}" anime="bounceInDown"></my-mask>

// 关闭按钮
<my-mask hidden="{{}}" close bindclose=""></my-mask>
<my-mask hidden="{{}}" close-icon="" bindclose=""></my-mask>

// 切换遮罩
<my-mask class="" hidden="{{!mask.ID}}" data-id="ID" bindclose="toggleMask"></my-mask>
toggleMask(e) {
  let that = this;
  let id = e.currentTarget.dataset.id;
  that.setData({
    [`mask.${id}`]: !that.data.mask[id],
  });
},

*/

import c from '../../utils/console';

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  properties: {
    hidden: {
      type: Boolean,
      value: true,
    },
    bg: {
      type: String,
      value: 'rgba(0,0,0,.7)',
    },
    x: {
      type: String,
      value: '0',
    },
    y: {
      type: String,
      value: '0',
    },
    anime: {
      type: String,
      value: '',
    },
    close: {
      type: Boolean,
      value: false,
    },
    closeIcon: {
      type: String,
    },
  },
  data: {},
  attached() {
    comp = this;
  },
  methods: {
    close(e) {
      this.triggerEvent('close', e);
    },
  },
};

Component(compObj);
