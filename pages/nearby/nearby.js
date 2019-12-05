// pages/nearby/nearby.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
const host = app.globalData.host;
const config = require('../../key');

Page({

  /**
   * Page initial data
   */
  data: {
    mapKey: config.mapKey

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const that = this
    wx.getLocation({
      type: 'wgs84', // **1
      success: function (res) {
        const latitude = res.latitude
        const longitude = res.longitude

        wx.request({
          url: host + "buildings",
          success: function (res) {
            // const user = res.data
            const buildings = res.data.buildings;
            console.log(buildings);
            that.setData({
              buildings: buildings
            });

            wx.hideToast();
          }
        })

        that.setData({ latitude, longitude,
          markers: [{
            id: 0,
            latitude: latitude,
            longitude: longitude,
            iconPath: '/icons/map/user.png',//图标路径
            width: 30,
            height: 50,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }],
         })
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