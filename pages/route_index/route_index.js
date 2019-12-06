// pages/route_index/route_index.js
const app = getApp()
const host = app.globalData.host;

Page({

  /**
   * Page initial data
   */
  data: {
    // SEARCH BAR COPY BEGIN -1
    inputShowed: true,
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
    let page = this
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    wx.request({
      url: host + "routes",
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

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    console.log(e)
    let page = this
    wx.request({
      url: host + `routes?query=${e.detail.value}`,
      success: function (res) {
        // const user = res.data
        const routes = res.data.routes;
        console.log(routes);
        page.setData({
          routes: routes
        });
      }
    })
  },

  // SEARCH BAR COPY END -2

  tapCard: function (event) {
    console.log(event)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/route_show/route_show?id=${id}`
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
    this.setData ({
      inputVal: ''
    })
    wx.request({
      url: host + "routes",
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

  }
})