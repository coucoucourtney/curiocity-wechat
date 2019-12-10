// pages/direction/direction.js
const app = getApp()
const config = require('../../key');


var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: config.mapKey // 必填
});

Page({

  /**
   * Page initial data
   */
  data: {
    markers: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('options', options)
    // get user current location
    const dest = options.coordinates
    const address = options.address
    const name = options.name
    const page = this
    wx.getLocation({
      type: 'gcj02', // **1
      success: function (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const start = `${latitude},${longitude}`
        page.setData( {latitude, longitude, start, dest, address, name } )

        qqmapsdk.direction({
          mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
          //from参数不填默认当前地址
          from: start,
          to: dest,
          success: function (res) {
            var ret = res;
            var coors = ret.result.routes[0].polyline, pl = [];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length; i += 2) {
              pl.push({ latitude: coors[i], longitude: coors[i + 1] })
            }
            // console.log(pl)
            //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
            page.setData({
              latitude: pl[0].latitude,
              longitude: pl[0].longitude,
              polyline: [{
                points: pl,
                color: '#FF0000DD',
                width: 4,
                dottedLine: true
              }]
            })
          },
          fail: function (error) {
              console.error("error",error);
          },
          complete: function (res) {
            // console.log("res", res);
            const walk = res.result.routes[0]
            console.log('walk', walk)
            page.setData({ walk })
          }
        });




      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})