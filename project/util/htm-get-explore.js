/**
 * @desc 获取浏览器类型和版本
 * @return {String}
 */

export default () => {
  const { userAgent } = window.navigator;
  const userAgentLC = userAgent.toLowerCase();
  const map = [
    ['IE', /rv:([\d.]+)\) like gecko/],
    ['IE', /msie ([\d.]+)/],
    ['EDGE', /edge\/([\d.]+)/],
    ['Firefox', /firefox\/([\d.]+)/],
    ['Chrome', /(?:opera|opr).([\d.]+)/],
    ['Opera', /chrome\/([\d.]+)/],
    ['Safari', /version\/([\d.]+).*safari/],
    ['WechatDevtools', /wechatdevtools appservice port\/(\d+)/],
  ];

  for (let i = 0; i < map.length; i += 1) {
    const [key, val] = map[i];
    const match = userAgentLC.match(val);
    if (match) {
      return `${key}: ${match[1]}`;
    }
  }

  return userAgent;
};
