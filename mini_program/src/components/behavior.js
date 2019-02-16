export default Behavior({
  behaviors: [],
  options: {
    multipleSlots: true,
  },
  data: {},
  properties: {},
  created() {},
  attached() {},
  detached() {},
  pageLifetimes: {
    show() {},
    hide() {},
  },
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
  },
});
