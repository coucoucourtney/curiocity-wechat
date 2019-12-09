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

  toggleFavorites: function (e) {

    const page = this
    page.setData({ favorited: !page.data.favorited })

    let newFavorite = {};
    newFavorite.favorited = this.data.favorited
    newFavorite.id = e.currentTarget.dataset.id
    newFavorite.user_id = parseInt(app.globalData.userId)
    console.log(newFavorite);
    console.log('url: ', app.globalData.host + `favorite`)
    let building = page.data.building

    wx.request({
      url: app.globalData.host + `favorite`,
      method: 'GET',
      data: newFavorite,
      success(res) {
        console.log("result", res)
        if (building.favorited) {
          building.favorited = false
          page.setData({building})
        } else {
          building.favorited = true
          page.setData({ building })
        }
      }
    })
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
        let favorite = res.data.favorited
        console.log("favorite", favorite)
        page.setData({ favorited: !page.data.favorited })


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
      page.setData({ 
        markers
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
  //Go to direction page 
  // goToDirection: function(e) {
  //   console.log(e)
  //   const building = e.currentTarget.dataset.building;
  //   const coordinates = `${building.latitude},${building.longitude}`

  //   wx.navigateTo({
  //     url: `/pages/direction/direction?coordinates=${coordinates}&address=${building.address}&name=${building.name}`,
  //   })
  // },
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