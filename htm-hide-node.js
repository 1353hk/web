// 创建隐藏节点
export default (htm, opt) => {
  let hideNode = document.createElement('div');
  hideNode.style.cssText = `
      position: absolute;
      top: -999;
      z-index: -999;
      opacity: 0;
      ${opt}
    `;

  //创建虚拟DOM
  let dom = document.createDocumentFragment();
  dom.appendChild(hideNode);

  // 克隆节点
  let cloneNode = htm.cloneNode(true);
  hideNode.appendChild(cloneNode);

  document.body.appendChild(dom);
  return {
    node: hideNode,
    del() {
      document.body.removeChild(dom);
    },
  };
};
