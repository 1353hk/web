import c from '../../utils/console.js';

// 引入SDK核心类
const QQMapWX = require('../../static/qqmap-wx-jssdk.js');

const qqmapsdk = new QQMapWX({
  key: 'ETJBZ-4UGCX-E3A4Z-ZQ5OL-MZIPE-PTFSG',
});

// 提供由地址描述到所述位置坐标的转换，与逆地址解析的过程正好相反
const getGeocoder = address => new Promise((resolve, reject) => {
  qqmapsdk.geocoder({
    address,
    success(res) {
      if (res.status === 0) {
        resolve(res.result);
      } else {
        console.error(res);
        reject(res);
      }
    },
    fail(res) {
      console.error(res);
      reject(res);
    },
  });
});

Page({
  data: {
    markers: [
      {
        iconPath: '/personAtv1.is.png',
        id: 0,
        latitude: 23.099994,
        longitude: 113.32452,
        width: 50,
        height: 50,
      },
    ],
    polyline: [
      {
        points: [
          {
            longitude: 113.3245211,
            latitude: 23.10229,
          },
          {
            longitude: 113.32452,
            latitude: 23.21229,
          },
        ],
        color: '#FF0000DD',
        width: 2,
        dottedLine: true,
      },
    ],
    controls: [
      {
        id: 1,
        iconPath: '/personAtv1.not.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50,
        },
        clickable: true,
      },
    ],
  },
  regionchange(e) {
    console.log(e.type);
  },
  markertap(e) {
    console.log(e.markerId);
  },
  controltap(e) {
    console.log(e.controlId);
  },

  onLoad() {
    // console.log(11);
    // getGeocoder('北京市海淀区彩和坊路海淀西大街74号')
    //   .then((res) => {
    //     console.log(33, res);
    //     return 44;
    //   })
    //   .then((res) => {
    //     console.log(44, res);
    //   });
    // console.log(22);
  },

  onShow() {},

  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map');
  },

  getCenterLocation() {
    this.mapCtx.getCenterLocation({
      success(res) {
        console.log(res.longitude);
        console.log(res.latitude);
      },
    });
  },
  moveToLocation() {
    this.mapCtx.moveToLocation();
  },
  translateMarker() {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end');
      },
    });
  },
  includePoints() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [
        {
          latitude: 23.10229,
          longitude: 113.3345211,
        },
        {
          latitude: 23.00229,
          longitude: 113.3345211,
        },
      ],
    });
  },
});
