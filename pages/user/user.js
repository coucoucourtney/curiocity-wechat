// pages/user/user.js
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

  },


  editUser: function (e) {
    let id = e.currentTarget.dataset.id
    console.log(e)
    wx.navigateTo({
      url: `/pages//?id=${id}`,
    })
  },

  addBuilding: function (e) {
    let id = e.currentTarget.dataset.id
    console.log(e)
    wx.navigateTo({
      url: `/pages/building_create/building_create?id=${id}`,
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
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    let page = this
    // let id = this.data.userId || 1;
    wx.request({
      url: host + "buildings",
      success: function (res) {
        // const user = res.data
        const buildings = res.data.buildings;
        console.log(buildings);
        page.setData({
          buildings: buildings
        });

        wx.hideToast();
      }
    })
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