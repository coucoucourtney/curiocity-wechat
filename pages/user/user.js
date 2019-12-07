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
      url: `/pages/user_edit/user_edit?id=${id}`,
      // do we need this id? just use user id
    })
  },

  addBuilding: function (e) {
    let id = e.currentTarget.dataset.id
    console.log(e)
    wx.navigateTo({
      url: `/pages/building_create/building_create?id=${id}`,
      // do we need this id? just use user id
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
    console.log("options line 53", options)

    const page = this
    const userId = app.globalData.userId;
    console.log(1,)
    wx.request({
      url: host + `users/${userId}`,
      success: function (res) {
        const user = res.data.userId
        page.setData({ 
          user 
          });
        }
      })
    console.log("buildings", user.buildings);
    
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log("res line75" ,res.userInfo)
    app.globalData.userInfo = res.userInfo
      page.setData({
        userInfo: res.userInfo
        // trying to send to db
      });
      // console log below not showing not setting info until click login
      console.log("test name line 82", userInfo.nickName)
        }
      })
      // want to send to db??? -----------------------------------?
      // let updatedUser = {}
      //   updatedUser.wechat_name = userInfo.nickName
      //   updatedUser.avatar = userInfo.avatarUrl
      //   updatedUser.language = userInfo.language
      //   updatedUser.gender = userInfo.gender
      //   updatedUser.province = userInfo.province
      //     wx.request({
      //       url: host + `users/${id}`,
      //       method: 'put',
      //       data: updatedUser,
      //       success: function (res) {
      //         console.log(res)
      //         console.log("name", user.name)
      //       }
          // })
  }
  }
    })
  },


//   /**
//    * Lifecycle function--Called when page is initially rendered
//    */
//   onReady: function () {

//   },

//   /**
//    * Lifecycle function--Called when page show
//    */
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