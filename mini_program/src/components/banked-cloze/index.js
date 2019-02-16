/*

<my-banked-cloze class="my-banked-cloze" myprop="{{question}}" bind:myevent="checkAnswer"></my-banked-cloze>
<my-banked-cloze class="my-banked-cloze" myprop="{{question}}" row="3" col="7" bind:myevent="checkAnswer"></my-banked-cloze>
<my-banked-cloze class="my-banked-cloze" myprop="{{question}}" click="{{tips}}" bind:myevent="checkAnswer"></my-banked-cloze>

*/

import c from '../../utils/console';

const characters =
  '的一是了我不人在他有这个上们来到时大地为子中你说生国年着就那和要她出也得里后自以会家可下而过天去能对小多然于心学幺之都好看起发当没成只如事把还用第样道想作种开美总从无情己面最女但现前些所同日手又行意动方期它头经长儿回位分爱老因很给名法间斯知世什两次使身者被高已亲其进此话常与活正感见明问力理尔点文几定本公特做外孩相西果走将月十实向声车全信重三机工物气每并别真打太新比才便夫再书部水像眼等体却加电主界门利海受听表德少克代员许稜先口由死安写性马光白或住难望教命花结乐色更拉东神记处让母父应直字场平报友关放至张认接告入笑内英军候民岁往何度山觉路带万男边风解叫任金快原吃妈变通师立象数四失满战远格士音轻目条呢病始达深完今提求清王化空业思切怎非找片罗钱吗语元喜曾离飞科言干流欢约各即指合反题必该论交终林请医晚制球决传画保读运及则房早院量苦火布品近坐产答星精视五连司巴奇管类未朋且婚台夜青北队久乎越观落尽形影红爸百令周吧识步希亚术留市半热送兴造谈容极随演收首根讲整式取照办强石古华拿计您装似足双妻尼转诉米称丽客南领节衣站黑刻统断福城故历惊脸选包紧争另建维绝树系伤示愿持千史谁准联妇纪基买志静阿诗独复痛消社算义竟确酒需单治卡幸兰念举仅钟怕共毛句息功官待究跟穿室易游程号居考突皮哪费倒价图具刚脑永歌响商礼细专黄块脚味灵改据般破引食仍存众注笔甚某沉血备习校默务土微娘须试怀料调广苏显赛查密议底列富梦错座参八除跑亮假印设线温虽掉京初养香停际致阳纸李纳验助激够严证帝饭忘趣支春集丈木研班普导顿睡展跳获艺六波察群皇段急庭创区奥器谢弟店否害草排背止组州朝封睛板角况曲馆育忙质河续哥呼若推境遇雨标姐充围案伦护冷警贝着雪索剧啊船险烟依斗值帮汉慢佛肯闻唱沙局伯族低玩资屋击速顾泪洲团圣旁堂兵七露园牛哭旅街劳型烈姑陈莫鱼异抱宝权鲁简态级票怪寻杀律胜份汽右洋范床舞秘午登楼贵吸责例追较职属渐左录丝牙党继托赶章智冲叶胡吉卖坚喝肉遗救修松临藏担戏善卫药悲敢靠伊村戴词森耳差短祖云规窗散迷油旧适乡架恩投弹铁博雷府压超负勒杂醒洗采毫嘴毕九冰既状乱景席珍童顶派素脱农疑练野按犯拍征坏骨余承置彩灯巨琴免环姆暗换技翻束增忍餐洛塞缺忆判欧层付阵批岛项狗休懂武革良恶恋委拥娜妙探呀营退摇弄桌熟诺宣银势奖宫忽套康供优课鸟喊降夏困刘罪亡鞋健模败伴守挥鲜财孤枪禁恐伙杰迹妹遍盖副坦牌江顺秋萨菜划授归浪听凡预奶雄升编典袋莱含盛济蒙棋端腿招释介烧误';

const app = getApp();
const appData = app.data;
let comp;

const compObj = {
  options: {
    multipleSlots: true,
  },
  externalClasses: ['myclass'],
  data: {
    answerList: [], // 回答区
    characterList: [], // 选择区
    isWrong: false, // 是否错误
  },
  properties: {
    myprop: {
      type: Object,
      value: {
        text: '',
      },
      observer(newVal) {
        if (!newVal) return;
        comp = this;

        let { text } = newVal;
        if (text === undefined || text === '') return;

        text = String(text);
        const textLen = text.length;

        // 初始化回答区
        const answerList = Array.from({ length: textLen }, () => ({
          text: '',
          id: '',
          state: 0,
        }));

        // 初始化选择区
        const characterList = comp
          .arr_random(characters, comp.data.row * comp.data.col, true)
          .map((v, k) => ({
            text: v,
            id: k,
            state: 0,
          }));

        // 获取答案索引
        let answerIndex;
        if (textLen > 1) {
          answerIndex = comp.arr_random(characterList.length, textLen, true);
        } else {
          answerIndex = [0];
        }

        // 将答案赋予给选择区
        answerIndex.forEach((v, k) => {
          characterList[v].text = text[k];
        });

        comp.setData({
          answerList, // 回答区
          characterList, // 选择区
        });

        console.log('选择区', characterList);
      },
    },
    // 行数
    row: {
      type: Number,
      value: 2,
      // observer(newVal, oldVal, changedPath) {},
    },
    // 列数
    col: {
      type: Number,
      value: 6,
      // observer(newVal, oldVal, changedPath) {},
    },
    // 模拟点击
    click: {
      type: Array,
      value: [],
      observer(newVal) {
        if (!newVal.length) return;
        comp = this;
        comp.resetAnswer(); // 重置答案

        const { data } = comp;
        const { answerList, characterList } = data; // 获取回答区与选择区
        let newValIndex = 0;
        for (let index = answerList.length; index--;) {
          const text = newVal[newValIndex++]; // 获取点击文字
          if (text) {
            // 如果文字存在
            const item = characterList.find(i => i.text === text && !i.state);
            comp.setAnswer(item, index, 1);
          } else {
            break;
          }
        }

        // 检查答案
        comp.checkAnswer(data.answerList);
      },
    },
  },
  attached() {
    comp = this;
    comp.setData({
      userInfo: appData.userInfo,
    });
  },
  detached() {},
  methods: {
    // 获取数组中的随机因素
    arr_random(arg, num = 1, unique) {
      // 如果参数为数值时
      if (typeof arg === 'number') {
        const arr = [];
        for (let i = 0; i < arg; i += 1) {
          arr.push(i);
        }
        arg = arr;
      }

      // 如果参数为字串时
      if (typeof arg === 'string') {
        arg = arg.trim().split('');
      }

      const len = arg.length;

      // 获取0个元素时变成获取原个数
      if (num === 0) num = len;

      if (num > 1) {
        // 获取多个元素
        const arr = [];

        // 获取不重复数组时获取个数不能超过数组个数
        if (unique && num > len) num = len;

        for (let i = 0; i < num; i += 1) {
          let index;
          if (unique) {
            // 获取不重复数组
            do {
              index = Math.floor(Math.random() * len);
            } while (arr.some(i => i === arg[index]));
          } else {
            // 获取可重复数组
            index = Math.floor(Math.random() * len);
          }
          arr.push(arg[index]);
        }
        return arr;
      }
      // 获取单个元素
      const index = Math.floor(Math.random() * len);
      return arg[index];
    },

    // 设置答案
    setAnswer(item, index, type) {
      if (type) {
        comp.setData({
          [`answerList[${index}]`]: {
            text: item.text,
            id: item.id,
            state: 1,
          },
          [`characterList[${item.id}].state`]: 1,
        });
      } else {
        comp.setData({
          [`answerList[${index}]`]: {
            text: '',
            id: '',
            state: 0,
          },
          [`characterList[${item.id}].state`]: 0,
        });
      }
    },

    // 选择答案
    addAnswer(e) {
      const { dataset } = e.target;
      const { item } = dataset;
      if (!item || item.state) return;

      const { answerList } = comp.data;
      const index = answerList.findIndex(i => !i.text);

      if (index === -1) return;

      comp.setAnswer(item, index, 1);

      // 检查答案
      comp.checkAnswer(answerList);
    },

    // 移除答案
    delAnswer(e) {
      const { dataset } = e.target;
      const { item, index } = dataset;
      if (!item || !item.state) return;

      comp.setAnswer(item, index);
      comp.setData({ isWrong: false });
    },

    // 重置答案
    resetAnswer(e) {
      const { answerList } = comp.data;
      answerList.forEach((item, index) => {
        if (item.text) {
          comp.setAnswer(item, index);
          comp.setData({ isWrong: false });
        }
      });

      // 如果为重置按钮
      if (e) comp.triggerEvent('reset');
    },

    // 检查答案
    checkAnswer(answerList) {
      const arr = answerList.map(i => i.text);
      const str = arr.join('');

      const text = String(comp.data.myprop.text || '');
      if (str.length >= text.length) {
        if (str !== text) {
          comp.setData({ isWrong: true });
        }

        comp.triggerEvent(
          'myevent',
          {
            comp: 'checkAnswer',
            text: str,
          },
          {
            bubbles: true,
            composed: true,
          },
        );
      }
    },
  },
};

Component(compObj);
