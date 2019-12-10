// pages/route_index/route_index.js
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
    let page = this
    const userId = app.globalData.userId;
    this.setData({
      inputVal: "",
      inputShowed: false
    });
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
      url: host + `routes?query=${e.detail.value}&user_id=${userId}`,
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

  toggleFavorites: function (e) {
    console.log('e', e)
    const page = this

    // MAX GET RID OF THIS BELOW
    // page.setData({ favorited: !page.data.favorited })
    const index = e.currentTarget.dataset.index

    let newFavorite = {};
    // newFavorite.favorited = this.data.routes[index].favorited
    // console.log('this.data.favorited', this.data.favorited)
    newFavorite.id = e.currentTarget.dataset.id
    console.log(2, newFavorite.id)
    newFavorite.user_id = parseInt(app.globalData.userId)
    console.log(3, newFavorite);
    console.log('url: ', app.globalData.host + `route_favorite`)
    let routes = page.data.routes
    

      wx.request({
        url: app.globalData.host + `route_favorite`,
        method: 'GET',
        data: newFavorite,
        success(res) {
          console.log("result", res)
            if (routes[index].favorited) {
                routes[index].favorited = false

                page.setData({ routes })
            } else {
                routes[index].favorited = true
                page.setData({ routes })
            }
        }
      })
  },




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
    console.log("options",options)
    const userId = app.globalData.userId;
    console.log("user", userId)
    const page = this
    const id = options.id
    console.log(1, options)
    wx.request({
      url: host + `routes?user_id=${userId}`,
      success: function (res) {
        let favorite = res.data.favorited
        console.log("favorite", favorite)
        // AC: page.setData({ favorited: !page.data.favorited })
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
    let page = this
    const userId = app.globalData.userId;
    this.setData ({
      inputVal: ''
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

  }
})