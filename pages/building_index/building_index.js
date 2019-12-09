// pages/building_index/building_index.js
const app = getApp()
const host = app.globalData.host;


Page({

  /**
   * Page initial data
   */
  data: {
    // SEARCH BAR COPY BEGIN -1
    inputShowed: false,
    inputVal: ""
    
    // SEARCH BAR COPY END -2
  },

// SEARCH BAR COPY BEGIN -2
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    const userId = app.globalData.userId;
    let page = this
    this.setData({
      inputVal: "",
      inputShowed: false
    });
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
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    const userId = app.globalData.userId;
    console.log(e)
    let page = this
    wx.request({
      url: host + `buildings?user_id=${userId}&query=${e.detail.value}`,
      success: function (res) {
        // const user = res.data
        const buildings = res.data.buildings;
        console.log(buildings);
        page.setData({
          buildings: buildings
        });
      }  
    })
  },

  toggleFavorites: function (e) {
    console.log(e)
    const page = this
    const index = e.currentTarget.dataset.index
    let newFavorite = {};
    newFavorite.favorited = this.data.favorited
    newFavorite.id = e.currentTarget.dataset.id
    newFavorite.user_id = parseInt(app.globalData.userId)
    console.log(newFavorite);
    console.log('url: ', app.globalData.host + `favorite`)
    let buildings = page.data.buildings

    wx.request({
      url: app.globalData.host + `favorite?user_id=${app.globalData.userId}`,
      method: 'GET',
      data: newFavorite,
      success(res) {
        console.log("result", res)
        if (buildings[index].favorited) {
          buildings[index].favorited = false
          page.setData({ buildings })
        } else {
          buildings[index].favorited = true
          page.setData({ buildings })
        }
      }
    })
  },



  // SEARCH BAR COPY END -2

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  // onReady: function () {

  // },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log('inside onShow')
    const userId = app.globalData.userId;
    console.log('userId', userId)
    let page = this
    this.setData({
      inputVal: ''
    })
    let url = userId == "" ? `${host}${buildings}` : `${host}buildings?user_id=${userId}`
    wx.request({
      url: url,
      success: function (res) {
        // const user = res.data
        const buildings = res.data.buildings;
        console.log(buildings);
        page.setData({
          buildings: buildings,
        });

        wx.hideToast();
      }
    })
  },

  goToWalksPage: function () {
    wx.switchTab({
      url: '/pages/route_index/route_index',
    })
  },

  goToDiscoverPage: function () {
    wx.switchTab({
      url: '/pages/nearby/nearby',
    })
  },

  goToCreateBuilding: function () {
    wx.navigateTo({
      url: '/pages/building_create/building_create',
    })
  },
  // clearInput: function () {
  //   this.setData({
  //     inputVal: ""
  //   });
  // },
  

  // BIND TAP TO CLICK CARD THROUGH TO SHOW PAGE
  tapCard: function (event) {
    const userId = app.globalData.userId;
    console.log(event)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/building_show/building_show?id=${id}&user_id=${userId}`
    })
  },

  tapStar: function () {
  },

  getUserInfo: function (e) {
    const page = this
    console.log("E", e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.login = true
    const userId = app.globalData.userId;
    console.log("userId line 12", userId)

    page.setData({
      userInfo: e.detail.userInfo
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
    page.setData({ updatedUser })
    wx.request({
      url: host + `users/${userId}`,

      method: 'put',
      data: updatedUser,
      success: (res) => {
        console.log("line 33 successfully saved to user", res)
      }
    })
    // }
  },
  
  /**
   * Lifecycle function--Called when page hide
   */
  // onHide: function () {

  // },

  /**
   * Lifecycle function--Called when page unload
   */
  // onUnload: function () {

  // },

  /**
   * Page event handler function--Called when user drop down
   */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * Called when page reach bottom
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * Called when user click on the top right corner to share
  //  */
  // onShareAppMessage: function () {

  // },

  scrollToDiv: function () {
    wx.pageScrollTo({
      scrollTop: 545,
    })
  },
})