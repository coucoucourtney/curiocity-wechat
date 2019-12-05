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
    //  host: "http://localhost:3000/api/v1/"
    host: "https://curiocity.wogengapp.cn/api/v1/"
  }
})