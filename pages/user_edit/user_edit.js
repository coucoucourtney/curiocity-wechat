// pages/user_edit/user_edit.js
const app = getApp()
const host = app.globalData.host;

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    const userId = app.globalData.userId;
    const userInfo = app.globalData.userInfo;
    const id = options.id
    console.log(options.id)
    console.log(userId)
    wx.request({
      url: host + `users/${id}`,
      success: function (res) {
        console.log("yes", res)
        const user = res.data.user.id
        page.setData({ user })
        console.log("user", user)
      }
    })
  },

  updateUser: function (event) {
    console.log(event)
    // let id = this.data.user.id
    const userId = app.globalData.userId;
    const userInfo = app.globalData.userInfo;
    let newUser = {};
    newUser.wechat_name = event.detail.value.wechat_name
    newUser.description = event.detail.value.description
    console.log("loading edit form" ,userId)
    wx.request({
      url: host + `users/${userId}`,
      method: 'put',
      data: newUser,
      success: function (res) {
        console.log(res)
        // const id = res.data.id
        wx.switchTab({
          url: `/pages/user/user`,
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