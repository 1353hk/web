/**
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
module.exports = (url = window.location.href) => {
  const search = url.substring(url.lastIndexOf('?') + 1);

  if (!search) return {};

  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  );
};
