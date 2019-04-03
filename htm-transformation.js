import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

import HtmUnit from './htm-unit'; //转换单位

export default {
  /**预设 */
  preset: {
    name: 'file', //名称
    padding: 10, //边距
    size: 'a4', //尺寸
    compression: 'MEDIUM', //压缩
    encoder: 1, //压缩
  },

  setCustom(custom) {
    let opt = custom ? { ...this.preset, ...custom } : this.preset;
    this.opt = opt; // 选项

    let { size } = opt;
    let [pageW, pageH] = this.sizeList[size];
    this.pageW = pageW; // 页面宽度
    this.pageH = pageH; // 页面高度

    let padding = this.preset.padding * 2; //边距
    let htmUnit = new HtmUnit();
    this.contW = htmUnit.mm2px(pageW) - padding; // 内容宽度
    // this.contH = htmUnit.mm2px(pageH) - padding; // 内容高度
  },

  /**尺寸列表 */
  sizeList: {
    a0: [841, 1189],
    a1: [594, 841],
    a2: [420, 594],
    a3: [297, 420],
    a4: [210, 297],
    a5: [148, 210],
    a6: [105, 148],
    a7: [74, 105],
    a8: [52, 74],
    a9: [37, 52],
    a10: [26, 37],

    b0: [1000, 1414],
    b1: [707, 1000],
    b2: [500, 707],
    b3: [353, 500],
    b4: [250, 353],
    b5: [176, 250],
    b6: [125, 176],
    b7: [88, 125],
    b8: [62, 88],
    b9: [44, 62],
    b10: [31, 44],

    c0: [917, 1297],
    c1: [648, 917],
    c2: [458, 648],
    c3: [324, 458],
    c4: [229, 324],
    c5: [162, 229],
    c6: [114, 162],
    c7: [81, 114],
    c8: [57, 81],
    c9: [40, 57],
    c10: [28, 40],
  },

  htm2cvs(htm) {
    let cvs = html2canvas(htm, {
      windowWidth: this.contW, //内容宽度
      // height: this.contH, //内容高度
      scale: 1, //消除像素比的影响
    });
    return cvs;
  },

  cvs2img(cvs) {
    return cvs.toDataURL('image/jpeg', this.opt.encoder);
  },

  img2pdf(img) {
    let doc = new JsPDF({
      format: this.opt.size,
    });
    let { padding, compression, name } = this.opt;

    let arr = Array.isArray(img) ? img : [img];
    arr.forEach((item, index) => {
      if (index) doc.addPage(); //如果为多个图片则插入新页面

      // 转换单位
      let htmUnit = new HtmUnit();
      let imgObj = doc.getImageProperties(item);
      let w = htmUnit.px2mm(imgObj.width); // 真实宽度
      let h = htmUnit.px2mm(imgObj.height); // 真实高度
      let pageW = this.pageW; // 页面宽度
      let pageH = this.pageH; // 页面高度
      let imgW; // 合适图片宽度
      let imgH; // 合适图片高度
      let x;

      // 宽度是否大于a4
      if (w > pageW) {
        let contW = this.contW;
        imgW = contW;
        imgH = (contW / w) * h;
        x = padding; // 居中
      } else {
        imgW = w;
        imgH = h;
        x = (pageW - imgW) / 2; // 居中
      }

      /**插入图片 */
      let addImage = y => {
        doc.addImage({
          compression,
          imageData: item,
          w: imgW,
          h: imgH,
          x,
          y,
        });
      };

      // 是否单页
      if (imgH < pageH) {
        let y = (pageH - imgH) / 2; // 居中
        addImage(y);
      } else {
        let y = padding; // 页面偏移
        let leftH = imgH; //剩余页面高度

        // 如果存在剩余页面
        while (leftH > 0) {
          addImage(y);

          //先插入新页面
          leftH -= pageH;
          if (leftH > 0) {
            y -= pageH;
            doc.addPage();
          }
        }
      }

      /* 测试 */
      // console.log('像素比', window.devicePixelRatio);
      // console.log('像素2厘米', htmUnit.px2mm(770));
      // console.log('厘米2像素', htmUnit.mm2px(210));
      // let imgNode = new Image();
      // imgNode.src = item;
      // document.body.appendChild(imgNode);
      /* 测试 */
    });

    // 返回URI
    let datauri = doc.output('datauristring', { filename: name });
    return {
      datauri,
      save() {
        doc.save(name); //保存文件
      },
    };
  },

  htm2img(htm) {
    let img = this.htm2cvs(htm).then(this.cvs2img.bind(this));
    return img;
  },

  htm2pdf(htm, custom) {
    this.setCustom(custom);

    // window.html2canvas = html2canvas;
    // let doc = new JsPDF({});
    // doc.html(htm, {
    //   callback: pdf => {
    //     pdf.save(this.opt.name);
    //   },
    // });
    // return doc;

    // let pdf = this.htm2img(htm).then(img => this.img2pdf(img));
    // return pdf;

    let arr = Array.isArray(htm) ? htm : [htm];
    let imgs = arr.map(v => {
      let node = this.addPdfNode(v);
      let img = this.htm2img(node.firstElementChild).then(res => {
        document.body.removeChild(node); //移除pdf节点
        return res;
      });
      return img;
    });
    let prom = Promise.all(imgs).then(res => {
      let pdf = this.img2pdf(res);
      return pdf;
    });
    return prom;
  },

  /**生成pdf时用到的节点 */
  addPdfNode(htm) {
    // 创建隐藏节点
    let hideNode = document.createElement('div');
    hideNode.style.cssText = `
      position: absolute;
      top: -999px;
      left:-999px;
      z-index: -999;
      width: ${this.contW}px;
      opacity: 0;
    `;

    //创建虚拟DOM
    let dom = document.createDocumentFragment();
    dom.appendChild(hideNode);

    // 克隆节点
    let cloneNode = htm.cloneNode(true);
    hideNode.appendChild(cloneNode);

    document.body.appendChild(dom);
    return hideNode;
  },
};
