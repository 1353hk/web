/**
 * @desc 获取操作系统类型
 * @return {String}
 */

export default () => {
  const { navigator } = window;
  if (!navigator) return 'node';

  let { userAgent, appVersion } = navigator;
  if (userAgent) userAgent = userAgent.toLowerCase();
  if (appVersion) appVersion = appVersion.toLowerCase();

  switch (true) {
    case /mac/i.test(appVersion):
      return 'MacOSX';

    case /linux/i.test(appVersion):
      return 'linux';

    case /win/i.test(appVersion):
      if (/phone/i.test(userAgent)) return 'windowsPhone';
      return 'windows';

    case /android/i.test(userAgent):
      return 'android';

    case /iphone/i.test(userAgent):
    case /ipad/i.test(userAgent):
    case /ipod/i.test(userAgent):
      return 'ios';

    default:
      return userAgent;
  }
};
