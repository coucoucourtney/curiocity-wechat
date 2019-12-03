//app.js


App({
  onLaunch: function () {
    const host = 'host'
    console.log('beginning login')
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: host + 'login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log(res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },
  globalData: {
    // host: "http://localhost:3000/"
    host: "https://curiocity.wogengapp.cn/api/v1/"
  }
})