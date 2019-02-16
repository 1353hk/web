/*

  import audio from './utils/audio';

  //播放音效
  audio('SRC');

  //返回停止音效方法
  let audioStop = audio('SRC');
  audioStop();

  // 播放背景音乐
  const audioBg = audio('SRC');
  const audioBg = audio('SRC', 'NAME'); //用于苹果机型的音乐标题
  audioBg(true); //播放背景音乐
  audioBg(false); //暂停背景音乐

 */

export default (src, mode = 0, title = 'music') => {
  let audio;

  switch (mode) {
    case 0: {
      audio = wx.createInnerAudioContext();
      audio.autoplay = true;
      audio.src = src;
      audio.onEnded(audio.destroy);
      return audio.stop;
    }

    case 1: {
      audio = wx.createInnerAudioContext();
      audio.autoplay = true;
      audio.loop = true;
      break;
    }

    case 2: {
      audio = wx.getBackgroundAudioManager();
      audio.onEnded(() => {
        audio.src = src;
      });
      break;
    }

    default:
      break;
  }

  return (isPlay) => {
    if (isPlay) {
      if (audio.src) {
        audio.play();
      } else {
        audio.title = title;
        audio.src = src;
      }
    } else {
      audio.pause();
    }
  };
};
