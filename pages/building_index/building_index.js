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
    const userId = app.globalData.userId;
    let page = this
    this.setData({
      inputVal: ''
    })
    wx.request({
      url: host + `buildings`,
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