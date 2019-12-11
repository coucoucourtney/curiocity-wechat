// pages/user/user.js
const app = getApp()
const host = app.globalData.host; 

Page({

  getUserInfo: function (e) {
    const page = this
    console.log("E",e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.login = true
    const userId = app.globalData.userId; 
    console.log("userId line 12", userId)

    page.setData({
      userInfo: e.detail.userInfo,
      login: true
    })
    console.log("line 16", page.data.userInfo)
    // success: (res) => {
      // console.log("getuserinfores", res);
      const userDetails = page.data.userInfo
  // saving user info in user instance in backend
    let updatedUser = {}
        updatedUser.wechat_name = userDetails.nickName
        updatedUser.avatar = userDetails.avatarUrl
        updatedUser.language = userDetails.language
        updatedUser.gender = userDetails.gender
        updatedUser.language = userDetails.language
        console.log("updateduser", updatedUser)
        page.setData({ updatedUser})
    wx.request({
      url: host + `users/${userId}`,
      method: 'put',
      data: updatedUser,
      success: (res) => {
        console.log("line 33 successfully saved to user", res)
        page.setData({user: res.data})
      }
    })
  // }
  },

  /**
   * Page initial data
   */
  data: {
    login: getApp().globalData.login
  },
  
  unfavoriteRoute: function (e) {
    const page = this
    const index = e.currentTarget.dataset.index
    let newFavorite = {};
    newFavorite.favorited = false
    newFavorite.id = e.currentTarget.dataset.id
    newFavorite.user_id = parseInt(app.globalData.userId)
    console.log(newFavorite);
    let routes = page.data.routes
    console.log("routes", routes)

    wx.request({
      url: app.globalData.host + `route_favorite?user_id=${app.globalData.userId}`,
      method: 'GET',
      data: newFavorite,
      success(res) {
        console.log("result", res)
        page.onShow()
      }
    })
  },

  unfavoriteBuilding: function (e) {
    const page = this
    const index = e.currentTarget.dataset.index
    let newFavorite = {};
    newFavorite.favorited = false
    newFavorite.id = e.currentTarget.dataset.id
    newFavorite.user_id = parseInt(app.globalData.userId)
    console.log(newFavorite);
    let buildings = page.data.buildings
    console.log("buildings", buildings)

    wx.request({
      url: app.globalData.host + `favorite?user_id=${app.globalData.userId}`,
      method: 'GET',
      data: newFavorite,
      success(res) {
        console.log("result", res)
        page.onShow()
      }
    })
  },


  // editUser: function (e) {
  //   const userId = app.globalData.userId;
  //   console.log(e)
  //   wx.navigateTo({
  //     url: `/pages/user_edit/user_edit?user_id=${userId}`,
  //     // do we need this id? just use user id
  //   })
  // },

  addBuilding: function (e) {
    const userId = app.globalData.userId;
    console.log(e)
    wx.navigateTo({
      url: `/pages/building_create/building_create?user_id=${userId}`,
      // do we need this id? just use user id
    })
  },

  tapCard: function (event) {
    console.log(event)
    let id = event.currentTarget.dataset.id
    const userId = app.globalData.userId;
    wx.navigateTo({
      url: `/pages/building_show/building_show?id=${id}&user_id=${userId}`
    })
  },

  tapRoute: function (event) {
    console.log(event)
    let id = event.currentTarget.dataset.id
    const userId = app.globalData.userId;
    wx.navigateTo({
      url: `/pages/route_show/route_show?id=${id}&user_id=${userId}`
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    const page = this
    const userId = app.globalData.userId;

   
    wx.request({
      url: host + `users/${userId}`,
      success: function (res) {
        console.log("true", res)
        // const user = res.data
        const user = res.data;
        console.log(user);
        page.setData({
          user: user
        });
        wx.hideToast();
      }
    })
    wx.request({
          url: host + `buildings?user_id=${userId}`,
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
    wx.request({
      url: host + `routes?user_id=${userId}`,
      success: function (res) {
        // const user = res.data
        const routes = res.data.routes;
        console.log(routes);
        page.setData({
          routes: routes
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

  },

  goToWalks: function () {
    wx.switchTab({
      url: '/pages/route_index/route_index',
    })
  },

  goToBuildings: function () {
    wx.switchTab({
      url: '/pages/building_index/building_index',
    })
  },

  goToAboutUs: function () {
    wx.navigateTo({
      url: '/pages/about_us/about_us',
    })
  },

  goToUserAgreement: function () {
      wx.navigateTo({
      url: '/pages/user_agreement/user_agreement',
    })
  },
})