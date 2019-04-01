import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

import HtmUnit from './htm-unit'; //转换单位

export default {
  /**自定义 */
  custom: {},

  /**预设 */
  preset: {
    cvs: {
      windowWidth: 770,
    },
    pdf: {
      name: 'file',
      y: 10,
      compression: 'MEDIUM',
    },
  },

  html2canvas(htm) {
    let cvs = html2canvas(htm, this.preset.cvs);
    return cvs;
  },

  canvas2img(cvs) {
    return cvs.toDataURL('image/jpeg', this.custom.encoder || 1);
  },

  img2pdf(img) {
    let doc = new JsPDF();
    let opt = { ...this.preset.pdf, ...this.custom };

    /* 测试 */
    // console.log('厘米', htmUnit.mm2px(210));
    // let imgNode = new Image();
    // imgNode.src = img;
    // document.body.appendChild(imgNode);
    /* 测试 */

    let arr = Array.isArray(img) ? img : [img];
    arr.forEach(i => {
      // 转换单位
      let htmUnit = new HtmUnit();
      let imgObj = doc.getImageProperties(i);
      let w = htmUnit.px2mm(imgObj.width); // 真实宽度
      let h = htmUnit.px2mm(imgObj.height); // 真实高度

      let pageW = 210; // a4宽度
      let pageH = 297; // a4高度

      let imgW; // 合适图片宽度
      let imgH; // 合适图片高度

      // 宽度是否大于a4
      if (w > pageW) {
        imgW = pageW;
        imgH = (pageW / w) * h;
      } else {
        imgW = w;
        imgH = h;
      }

      let x = (pageW - imgW) / 2; // 居中

      // 是否单页
      if (imgH < pageH) {
        doc.addImage({
          compression: opt.compression,
          imageData: i,
          w: imgW,
          h: imgH,
          x,
          y: (pageH - imgH) / 2, // 居中
        });
      } else {
        let y = opt.y; // 页面偏移
        let leftH = imgH; //剩余页面高度

        // 如果存在剩余页面
        while (leftH > 0) {
          doc.addImage({
            compression: opt.compression,
            imageData: i,
            w: imgW,
            h: imgH,
            x,
            y,
          });

          //先插入新页面
          leftH -= pageH;
          if (leftH > 0) {
            y -= pageH;
            doc.addPage();
          }
        }
      }
    });

    // 返回URI
    let datauri = doc.output('datauristring', { filename: opt.name });
    return {
      datauri,
      save() {
        doc.save(opt.name); //保存文件
      },
    };
  },

  htm2img(htm) {
    let img = this.html2canvas(htm).then(this.canvas2img.bind(this));
    return img;
  },

  htm2pdf(htm, custom = {}) {
    this.custom = custom;

    // window.html2canvas = html2canvas;
    // let doc = new jsPDF({
    //   unit: 'px',
    // });
    // doc.html(htm, {
    //   callback(pdf) {
    //     pdf.save(name);
    //   },
    // });
    // return doc;

    // let pdf = this.htm2img(htm).then(img => this.img2pdf(img));
    // return pdf;

    let node = this.addPdfNode(htm);
    let pdf = this.htm2img(node.firstElementChild).then(img => {
      document.body.removeChild(node); //移除pdf节点
      return this.img2pdf(img);
    });
    return pdf;
  },

  /**生成pdf时用到的节点 */
  addPdfNode(htm) {
    // 创建隐藏节点
    let hideNode = document.createElement('div');
    hideNode.style.cssText = `
        position: absolute;
        top: -999;
        z-index: -999;
        opacity: 0;
        width: 770px;
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
