// pages/route_show/route_show.js
const config = require('../../key');
const app = getApp()
const host = app.globalData.host;

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
    const page = this
    const id = options.id
    console.log(1, options)
    wx.request({
      url: host + `routes/${id}`,
      success: function (res) {
        const route = res.data
        console.log(2, route)
        page.setData({ route })

        const checkpoints = route.checkpoints;
        console.log(3, checkpoints)
        const latitude = checkpoints[0].latitude
        const longitude = checkpoints[0].longitude
        var temp = []
        var markers = []
        for (var i = 0; i < checkpoints.length; i++) {
          temp.push({
            latitude: checkpoints[i].latitude,
            longitude: checkpoints[i].longitude
          })
          markers.push({ // 获取返回结果，放到mks数组中
            id: i,
            latitude: checkpoints[i].latitude,
            longitude: checkpoints[i].longitude,
            iconPath: '/icons/map/flag.png', //图标路径
            width: 30,
            height: 50,
            callout: { //可根据需求是否展示经纬度
              content: checkpoints[i].name,
              color: '#000',
              display: 'ALWAYS'
            }
          })
        }
        var polyline = [{
          points: temp,
          color: "#ff0000",
          width: 2,
          dottedLine: false
        }];
        page.setData({
          longitude: longitude,
          latitude: latitude,
          polyline: polyline,
          markers: markers
        })



      }
    })
  },

  tapCard: function (event) {
    console.log(event)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/building_show/building_show?id=${id}`
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {


  },

bindMarkertap: function(e) {
  console.log(e)
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