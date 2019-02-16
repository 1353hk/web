module.exports = (element) => {
  const range = window.document.createRange();
  range.selectNode(element);
  const selObj = window.document.getSelection();
  selObj.removeAllRanges();
  selObj.addRange(range);
  window.document.execCommand('copy');
};
