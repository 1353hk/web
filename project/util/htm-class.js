module.exports = {
  /**
   * @desc 判断元素是否有某个class
   * @param {HTMLElement} ele
   * @param {String} cls
   * @return {Boolean}
   */
  hasClass(ele, cls) {
    return new RegExp(`(\\s|^)${cls}(\\s|$)`).test(ele.className);
  },

  /**
   * @desc   为元素添加class
   * @param  {HTMLElement} ele
   * @param  {String} cls
   */
  addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) {
      ele.className += ` ${cls}`;
    }
  },

  /**
   * @desc 为元素移除class
   * @param {HTMLElement} ele
   * @param {String} cls
   */
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);

      ele.className = ele.className.replace(reg, ' ');
    }
  },
};
