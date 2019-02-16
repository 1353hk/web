import c from '../../utils/console.js';

let app = getApp();
let appData = app.data;
let comp;

let compObj = {
  options: {
    multipleSlots: true,
  },
  properties: {
    type: {
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
