/*
  <my-scroll class="" myprop="{{scroll}}" bindmyevent=""></my-scroll>

  page.setData({
    scroll: {
      loading: false,
      list: [],//数据列表
      limit: 10,//限制个数
    },
  });
 */

import c from '../../utils/console';

let loading; // 是否正在加载
let scrollCache; // 缓存

const app = getApp();
const appData = app.data;
let comp;
const compObj = {
  options: {
    multipleSlots: true,
  },
  properties: {
    // 排行榜数据
    myprop: {
      type: Object,
      value: {
        list: [], // 用户列表
        limit: 10, // 限制个数
      },
      observer(newVal) {
        // 如果为初始化时
        if (!newVal) return;

        const { data } = this;

        // 获取缓存
        const oldObj = this.getCache(data.active);
        const oldList = oldObj.list;

        const newList = newVal.list;
        const { length } = newList;
        if (length) {
          // 存在响应数据

          if (oldObj.hasMore || !oldList.length) {
            // 加载更多
            oldList.push(...newList);
          }

          // 如果响应数据小于请求限制则为没有更多状态
          const hasMore = !(length < newVal.limit);
          oldObj.hasMore = hasMore;
          this.setData({
            hasMore,
          });
        } else {
          // 没有响应数据
          oldObj.hasMore = false;
          this.setData({
            hasMore: false,
          });
        }

        this.setData({
          list: oldList,
        });

        loading = false;
      },
    },
    type: {
      type: String,
      value: '',
      // observer(newVal, oldVal, changedPath) {},
    },
  },
  data: {
    active: 0, // 排行榜id: 0:好友; 1:世界
    list: [], // 用户列表
    hasMore: true, // 是否拥有更多
  },
  attached() {
    comp = this;

    loading = false;
    scrollCache = [];
  },
  detached() {},
  methods: {
    // 切换排行榜
    change(e) {
      // 如果正在加载则终止
      if (loading) return;

      const { data } = comp;

      // 获取切换id
      const active = +e.currentTarget.dataset.active;
      // 如果切换id和当前id相同则终止
      if (active == data.active) return;

      comp.setData({ active });

      // 获取缓存
      const oldObj = this.getCache(active);
      if (oldObj.list.length) {
        // 存在缓存数据
        comp.setData(oldObj);
        comp.triggerEvent('myevent', {
          active,
          page: oldObj.page,
          cache: true,
        });
      } else {
        // 没有缓存数据
        comp.triggerEvent('myevent', {
          active,
          page: 1,
        });
      }
    },

    // 获取更多排行榜
    more() {
      // 如果正在加载则终止
      if (loading) return;

      const { data } = comp;

      // 如果为没有更多状态则终止
      if (!data.hasMore) return;

      comp.triggerEvent('myevent', {
        active: data.active,
        page: ++this.getCache(data.active).page,
      });
    },

    // 获取缓存
    getCache(active) {
      let obj = scrollCache[active];

      // 不存在缓存时
      if (!obj) {
        // 创建缓存
        obj = {
          list: [],
          page: 1,
          hasMore: true,
        };
        scrollCache[active] = obj;
      }

      return obj;
    },
  },
};

Component(compObj);
