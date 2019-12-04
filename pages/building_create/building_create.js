// pages/building_create/building_create.js
const app = getApp()
const host = app.globalData.host;
const AV = require('../../utils/av-weapp-min.js');
Page({
  data: {
    items: []
  },
  onLoad: function () {
  },
  takePhoto: function () {
    let page = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        page.setData({
          tempFilePath
        })
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            let imgUrl = file.url();
            page.setData({
              imgUrl
            })
            console.log(page.data.imgUrl);
          }
        ).catch(console.error);
      }
    });
  },

  previewMyImage: function (files) {
    wx.previewImage({
      current: '',
      urls: files
    })
  },

  /**
   * Lifecycle function--Called when page load
   */


  createBuilding: function (event) {
    console.log(event)
    // let id = this.data.user.id
    const id = 1
    let newBuilding = {};
    newBuilding.name = event.detail.value.name
    newBuilding.year = event.detail.value.year
    newBuilding.architects = event.detail.value.architects
    newBuilding.architectural_style = event.detail.value.architectural_style
    newBuilding.description = event.detail.value.description
    newBuilding.metro_stop = event.detail.value.metro_stop
    newBuilding.address = event.detail.value.address
    newBuilding.address = event.detail.value.address
    newBuilding.user_id = id
    newBuilding.picture = this.data.imgUrl;
    console.log(newBuilding.picture);
    console.log(newBuilding)
    wx.request({
      url: host + `buildings/`,
      method: 'post',
      data: newBuilding,
      success: function (res) {
        console.log(res)
        const id = res.data.user_id
        wx.switchTab({
          url: `/pages/user/user?id=${id}`,
        })
      }
    })
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  // onReady: function () {

  // },

  // /**
  //  * Lifecycle function--Called when page show
  //  */
  // onShow: function () {

  // },

  // /**
  //  * Lifecycle function--Called when page hide
  //  */
  // onHide: function () {

  // },

  // /**
  //  * Lifecycle function--Called when page unload
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * Page event handler function--Called when user drop down
  //  */
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

  // }
})