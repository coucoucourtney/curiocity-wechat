// pages/building_show/building_show.js
const config = require('../../key');
const app = getApp()
const host = app.globalData.host;


Page({
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  /**
   * Page initial data
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    mapKey: config.mapKey
  },

  // toggleFavorites: function (e) {
  //   const page = this
  //   page.setData({ favorited: !page.data.favorited })
  //   const building_id = e.currentTarget.dataset.id
  //   const favorite = { building_id: building_id }
  //   const user_id = parseInt(app.globalData.userId);
  //   console.log('user_id', user_id)
  //   console.log('building_id', building_id)
  //   console.log('favorite', favorite)
  //   wx.request({
  //     url: app.globalData.host + `favorites?user_id=${user_id}`,
  //     method: 'POST',
  //     data: favorite,
  //     success(res) {
  //       console.log("result", res.data.favorite)
  //       const favorite = res.data.favorite;
  //       app.globalData.favorite = favorite;
  //     }
  //   })
  // },

  // toggleFavorites: function (event) {
  //   let page = this;
  //   let user_id = app.globalData.userId
  //   let spot_id = event.currentTarget.dataset.id
  //   console.log("spot_id", spot_id)
  //   console.log("user_id", user_id)
  //   wx.request({
  //     url: getApp().globalData.host + `favorites?user_id=${userId}`,
  //     method: 'POST',
  //     success(res) {
  //       console.log("result", res.data.favorite)
  //       const favorite = res.data.favorite;
  //       app.globalData.favorite = favorite;
  //     }
  //   })
  //   wx.navigateTo({
  //     url: '/pages/user/user'
  //   })
  // },




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
      // url: host + `buildings/${36}?user_id=${13}`,
      url: host + `buildings/${id}?user_id=${userId}`,
      success: function (res) {
        const building = res.data
        console.log(building)
        page.setData({ building })

        const markers = [
          {
            iconPath: "/icons/map/flag.png", // **1
            latitude: building.latitude,
            longitude: building.longitude,
            width: 30,
            height: 30
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