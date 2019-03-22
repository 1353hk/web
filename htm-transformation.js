import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

export default {
  preset: { name: 'file', x: 10, y: 10 },

  html2canvas(htm) {
    return html2canvas(htm);
  },

  canvas2img(cvs) {
    return cvs.toDataURL('image/jpeg');
  },

  img2pdf(img, custom) {
    let opt = { ...this.preset, ...custom };

    let doc = new JsPDF();
    doc.addImage(img, 'JPEG', opt.x, opt.y);
    doc.save(opt.name);
    return doc;
  },

  htm2img(htm) {
    let img = this.html2canvas(htm).then(this.canvas2img);
    return img;
  },

  htm2pdf(htm, custom) {
    let opt = { ...this.preset, ...custom };

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

    let pdf = this.htm2img(htm).then(img => this.img2pdf(img, opt));
    return pdf;
  },
};
