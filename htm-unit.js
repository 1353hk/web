// import HtmUnit from './htm-unit'; //转换单位
// let htmUnit = new HtmUnit();
// htmUnit.px2mm();
// htmUnit.mm2px();

export default class {
  constructor() {
    this.dip = this.getDPI()[0];
  }

  /**
   * 获取DPI
   * @returns {Array}
   */
  getDPI() {
    let arrDPI = [];
    let { deviceXDPI, deviceYDPI } = window.screen;
    if (deviceXDPI) {
      arrDPI = [deviceXDPI, deviceYDPI];
    } else {
      let tmpNode = document.createElement('DIV');
      tmpNode.style.cssText = `
      visibility:hidden;
      position:absolute;
      left:0px;
      top:0px;
      z-index:99;
      width:1in;
      height:1in;
    `;

      document.body.appendChild(tmpNode);

      deviceXDPI = window.parseInt(tmpNode.offsetWidth, 10);
      deviceYDPI = window.parseInt(tmpNode.offsetHeight, 10);
      arrDPI = [deviceXDPI, deviceYDPI];

      tmpNode.parentNode.removeChild(tmpNode);
    }

    return arrDPI;
  }

  /**
   * px转换为mm
   * @param px
   * @returns {number}
   */
  px2mm(px) {
    let inch = px / this.dip;
    let mm = (inch * 25.4) / window.devicePixelRatio;
    return Math.ceil(mm);
  }

  /**
   * mm转换为px
   * @param mm
   * @returns {number}
   */
  mm2px(mm) {
    let inch = mm / 25.4;
    let px = (inch * this.dip) / window.devicePixelRatio;
    return Math.ceil(px);
  }
}
