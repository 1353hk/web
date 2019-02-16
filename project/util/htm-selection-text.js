module.exports = (obj, val) => {
  const sta = obj.selectionStart;
  if (sta || sta == 0) {
    obj.value = obj.value.slice(0, sta) + val + obj.value.slice(obj.selectionEnd, obj.value.length);
    const newSta = sta + val.length;
    obj.selectionStart = newSta;
    obj.selectionEnd = newSta;
  } else if (window.document.selection) {
    obj.focus();
    const sel = window.document.selection.createRange();
    sel.text = val;
    sel.select();
  } else {
    obj.value += val;
  }
  obj.focus();
};
