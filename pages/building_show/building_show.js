// pages/building_show/building_show.js
const config = require('../../key');
const app = getApp()
const host = app.globalData.host;


Page({

  /**
   * Page initial data
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    mapKey: config.mapKey
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const userId = app.globalData.userId;
    const page = this
    const id = options.id
    console.log(1, options)
    console.log(options)
    wx.request({
      url: host + `buildings/${id}?user_id=${userId}`,
      success: function (res) {
        const building = res.data
        console.log(building)
        page.setData({ building })

        const markers = [
          {
            iconPath: "/icons/map/user_marker_large.png", // **1
            latitude: building.latitude,
            longitude: building.longitude,
            width: 30,
            height: 45
      }]
      page.setData({ markers})
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