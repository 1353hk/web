const doc = window.document;
const ele = doc.documentElement || doc.body;

module.exports = {
  /**
   * @desc 获取滚动条距顶部的距离
   * @returns {Number}
   */
  get() {
    return ele.scrollTop;
  },

  /**
   * @desc 设置滚动条距顶部的距离
   */
  set(value = 0) {
    window.scrollTo(0, value);
  },

  /* set() {
    const { scrollTop } = ele;
    if (scrollTop > 0) {
      window.scrollTo(0, scrollTop - scrollTop / 10);
      window.requestAnimationFrame(this.setScrollTop);
    }
  }, */

  /**
   * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
   * @param {Number} to
   * @param {Number} duration
   */
  setAnime(to, duration) {
    if (duration < 0) {
      this.set(to);
      return;
    }
    const diff = to - this.get();
    if (diff === 0) return;
    const step = (diff / duration) * 10;
    window.requestAnimationFrame(() => {
      if (Math.abs(step) > Math.abs(diff)) {
        this.set(this.get() + diff);
        return;
      }
      this.set(this.get() + step);
      if ((diff > 0 && this.get() >= to) || (diff < 0 && this.get() <= to)) {
        return;
      }
      this.setAnime(to, duration - 16);
    });
  },
};
