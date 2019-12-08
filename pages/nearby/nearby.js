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
    mapKey: config.mapKey,
    show: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // get userlocation
    const that = this
    const userId = app.globalData.userId;
    //  get the buildings from server
    wx.request({
      url: host + `buildings?user_id=${userId}`,
      success: function (res) {
        // const user = res.data
        const buildings = res.data.buildings;
        that.setData({
          buildings: buildings
        });
        wx.hideToast();
        var markers = [];
          for (var i = 0; i < that.data.buildings.length; i++) {
      markers.push({ // 获取返回结果，放到mks数组中
        id: i,
        latitude: that.data.buildings[i].latitude,
        longitude: that.data.buildings[i].longitude,
        iconPath: '/icons/map/flag.png', //图标路径
        width: 30,
        height: 30,
        callout: { //可根据需求是否展示经纬度
          content: that.data.buildings[i].name,
          color: '#000',
          display: 'TAP'
        }
      })
    }
        that.setData({
          markers: markers
        });
      }
    })
    wx.getLocation({
      type: 'wgs84', // **1
      success: function (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const markers = that.data.markers
        // console.log("1",markers)
        // set user location and marker
        markers.push({
            id: markers.length,
            latitude: latitude,
            longitude: longitude,
            iconPath: '/icons/map/user.png',//图标路径
            width: 28,
            height: 28,
            // callout: { //可根据需求是否展示经纬度
            //   content: latitude + ',' + longitude,
            //   color: '#000',
            //   display: 'ALWAYS'
            // }
            })
        that.setData({ latitude, longitude, markers })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
bindMarkertap: function(e) {
  const page = this;
  const building = page.data.buildings[e.markerId]
  console.log(building)
  const name = building.name
  const description = building.description
  const style = building.architectural_style
  page.setData({ name, description, style, show: true });
},
  onClose() {
    this.setData({ show: false });
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