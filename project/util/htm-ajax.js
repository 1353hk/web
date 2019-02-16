module.exports = (obj) => {
  const xhr = window.XMLHttpRequest
    ? new window.XMLHttpRequest()
    : new window.ActiveXObject('Microsoft.XMLHTTP');

  const timeout = obj.timeout === undefined ? 5000 : obj.timeout;
  const time = setTimeout(() => {
    xhr.abort();
    if (obj.error) obj.error('请求超时');
  }, timeout);

  const async = obj.async === undefined ? true : obj.async;

  let { url } = obj;
  const { data, type } = obj;
  if (type === undefined || type === 'GET') {
    const arr = [];

    const keys = Object.keys(data);
    keys.forEach(i => arr.push(`${i}=${data[i]}`));

    if (arr) {
      url += `?${arr.join('&')}`;
    }
    xhr.open('GET', url, async);
    xhr.send(null);
  } else {
    xhr.open(type, url, async);
    xhr.send(JSON.stringify(data));
  }

  if (!async) {
    clearTimeout(time);
    if (xhr.status === 200) {
      if (obj.success) obj.success(JSON.parse(xhr.response));
    } else if (obj.error) obj.error(xhr);
    return;
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      clearTimeout(time);
      if (xhr.status === 200) {
        if (obj.success) obj.success(JSON.parse(xhr.response));
      } else if (obj.error) obj.error(xhr);
    }
  };
};
