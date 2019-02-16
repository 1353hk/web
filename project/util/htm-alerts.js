module.exports = (obj) => {
  if (typeof obj === 'object') {
    if (obj.target) {
      window.alert(obj.target.outerHTML);
    } else if (obj.outerHTML) {
      window.alert(obj.outerHTML);
    } else {
      let str = '';

      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i += 1) {
        try {
          str += `${i} : ${obj[i]}\n\n`;
        } catch (e) {
          break;
        }
      }

      window.alert(str);
    }
  } else {
    window.alert(`${typeof obj} : ${obj}`);
  }
};
