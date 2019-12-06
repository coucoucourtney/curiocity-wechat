//app.js
const config = require('./key');

const AV = require('./utils/av-weapp-min.js');
AV.init({
  appId: config.appId,
  appKey: config.appKey,
  serverURLs: 'https://lyumbnqe.lc-cn-n1-shared.com'
});

App({
  onLaunch: function () {
    const host = this.globalData.hostLogin
    console.log('beginning login')
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: host + 'login',
          // url: "http://localhost:3000/login",
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log("res",res)
            this.globalData.userId = res.data.userId
          }
        })
      }
    })
  },

  fetchFontFamily() {
    // wx.loadFontFace({
    //   family: ""
    //   source: 'url("")'
    //   success: console.log
    // });
    // wx.loadFontFace({
    //   family: ""
    //   source: 'url("")'
    //   success: console.log
    // });
  },

  globalData: {
    hostLogin: "http://localhost:3000/",
     host: "http://localhost:3000/api/v1/"
    //  hostLogin: "https://curiocity.wogengapp.cn/",
    // host: "https://curiocity.wogengapp.cn/api/v1/"
  }
})
