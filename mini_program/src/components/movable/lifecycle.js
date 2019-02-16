import c from '../../utils/console';

const app = getApp();
const appData = app.data;

export default Behavior({
  methods: {
    /** 判断是否到达限制 */
    isStop(type) {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const likeCountComp = page.selectComponent('#likeCount');

      // 判断选择数
      if (appData.selectCount >= appData.selectLimit) {
        likeCountComp.show(3);
        return true;
      }

      // 判断喜欢数
      if (type === 1) {
        // 喜欢到达限制
        if (appData.likeCount >= appData.likeLimit) {
          likeCountComp.show(2);
          return true;
        }

        // 喜欢只剩10人
        if (appData.likeCount === appData.likeLimit - 10) {
          likeCountComp.show(1);
          return true;
        }

        appData.likeCount += 1; // 成功喜欢
      }

      appData.selectCount += 1; // 成功选择
      return false;
    },
  },
});
