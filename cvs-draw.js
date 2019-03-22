import React from 'react';

const Comp = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.cvs = React.createRef();
  }

  render() {
    return (
      <div className="">
        <canvas
          style={{ border: '1px solid' }}
          ref={this.cvs}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseEnter={this.onMouseEnter}
        >
          您的浏览器不支持canvas元素
        </canvas>

        <br />

        <button className="btn btn-primary" onClick={this.onRewrite}>
          重写
        </button>
        <button className="btn btn-primary" onClick={this.onConfirm}>
          确定
        </button>
        <button className="btn btn-primary" onClick={this.onCancel}>
          取消
        </button>
      </div>
    );
  }

  componentDidMount() {
    let cvsObj = {
      ...this.props,
      isDrawing: false,
      w: 400, //宽度
      h: 400, //高度
      line: 10, //线条厚度
    };

    let cvs = this.cvs.current;
    cvs.width = cvsObj.w;
    cvs.height = cvsObj.h;

    let ctx = cvs.getContext && cvs.getContext('2d');
    ctx.lineWidth = cvsObj.line;

    this.cvsObj = {
      ...cvsObj,
      cvs,
      ctx,
    };

    // 添加结束画画监听器
    this.onMouseUp = document.addEventListener('mouseup', e => {
      ctx.closePath();
      this.cvsObj.isDrawing = false;
    });
  }

  componentWillUnmount() {
    // 移除结束画画监听器
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  // 开始画画
  onMouseDown = e => {
    let { cvs, ctx, w, h } = this.cvsObj;
    ctx.beginPath();

    // 按下时获取元素位置
    let rect = cvs.getBoundingClientRect();
    let x1 = rect.left;
    let y1 = rect.top;
    let x = e.clientX - x1;
    let y = e.clientY - y1;
    ctx.moveTo(x, y);

    this.cvsObj = {
      ...this.cvsObj,
      x1,
      y1,
      x2: x1 + w,
      y2: y1 + h,
      isDrawing: true,
    };
  };

  // 在元素里移动
  onMouseMove = e => {
    let { isDrawing, x1, y1, ctx } = this.cvsObj;
    if (!isDrawing) return; //如果非画画状态这终止

    // 计算点击位置
    let x = e.clientX - x1;
    let y = e.clientY - y1;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // 回到元素
  onMouseEnter = e => {
    let { isDrawing } = this.cvsObj;
    if (isDrawing) this.onMouseDown(e);
  };

  // 重写
  onRewrite = e => {
    let { cvs, ctx, w, h } = this.cvsObj;
    ctx.clearRect(0, 0, w, h);
  };

  // 确定
  onConfirm = e => {
    let { cvs } = this.cvsObj;
    let img = cvs.toDataURL();
    this.props.handleConfirm(img);
  };

  // 取消
  onCancel = e => {
    this.props.handleCancel();
  };
};

export default Comp;
