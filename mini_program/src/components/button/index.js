import c from '../../utils/console.js';

let app = getApp();
let appData = app.data;
let comp;

let compObj = {
  properties: {
    text: {
      type: String,
    },
    icon: {
      type: String,
      value: '../../icon/pointer.png',
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
      value: 48,
    },
    bg: {
      type: String,
      value: '#fff09d',
    },
    openType: {
      type: String,
    },
  },
  data: {},
  attached() {
    comp = this;
  },
  methods: {},
};

Component(compObj);
