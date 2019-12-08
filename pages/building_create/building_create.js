// pages/building_create/building_create.js
// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

const app = getApp()
const host = app.globalData.host;
const AV = require('../../utils/av-weapp-min.js');
const config = require('../../key');


Page({
  data: {
    items: [],
    imgSliderUrl: [],
    mapKey: config.mapKey,
    city: "",
    metro: "",
    district: ""
  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: this.data.mapKey
    });
  },
  takeMainPhoto: function () {
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

  takeSliderPhoto: function () {
    let page = this;
    wx.chooseImage({
      // count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        page.setData({
          tempFilePath
        })
          console.log(tempFilePath)
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            let imgSliderUrl = page.data.imgSliderUrl
            imgSliderUrl.push(file.url());
            page.setData({
              imgSliderUrl
            })
            console.log(page.data.imgSliderUrl);
          }
        ).catch(console.error);
      }
    });
  },

  removePic: function(e) {
    let page = this
    let imgSliderUrl = page.data.imgSliderUrl
    console.log(1, e)
    const index = e.currentTarget.dataset.index;
    console.log(index)
    imgSliderUrl.splice(index, 1);
    page.setData({
      imgSliderUrl
    })
    console.log(page.data.imgSliderUrl);
  },

  // choose location on map and get the coordinates and name/address
  chooseLocation: function () {
    let page = this
    wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
        wx.chooseLocation({
          success: function (res) {
            console.log(res)
            const address = res.address
            const name = res.name
            const latitude = res.latitude
            const longitude = res.longitude
            page.setData({ address, name, latitude, longitude })
            page.nearby_search();
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },

  nearby_search: function () {
    var _this = this;
    const lat = _this.data.latitude;
    const lgt = _this.data.longitude;
    // 调用接口
    qqmapsdk.search({
      keyword: '地铁',  //搜索关键词
      location: `${lat},${lgt}`,  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        const metro_stop = res.data[0].title;
        _this.setData({
          metro_stop
        })
      },
    });
    // SEARCH FOR DISTRICT
    qqmapsdk.search({
      keyword: '区', 
      location: `${lat},${lgt}`,  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        const district = res.data[0].title;
        _this.setData({ district })
      },
    });
    // SEARCH FOR CITY DOESNT WORK BECAUSE NOT NEARBY ... NEEDS TO BE DONE EARLIER IN ANOTHER FUNCTION
    // qqmapsdk.search({
    //   keyword: '市',
    //   location: `${lat},${lgt}`,  //设置周边搜索中心点
    //   success: function (res) { //搜索成功后的回调
    //     const city = res.data[0].title;
    //     _this.setData({ 
    //         city 
    //       })
    //   console.log('city' , _this.data.city)
    //   },

    // });
  },

  createBuilding: function (event) {
    console.log(event)
    const page = this;
    const userId = app.globalData.userId;
    let newBuilding = {};
    // BUILDING VALUES -----------------------------
    newBuilding.name = event.detail.value.name
    newBuilding.main_picture = page.data.imgUrl
    newBuilding.main_photo_credit = event.detail.main_photo_credit
    newBuilding.address = event.detail.value.address
    newBuilding.old_address = event.detail.value.old_address
    newBuilding.neighborhood = event.detail.value.neighborhood
    newBuilding.district = event.detail.value.district
    newBuilding.year = event.detail.value.year
    newBuilding.architects = event.detail.value.architects
    newBuilding.architectural_style = event.detail.value.architectural_style
    newBuilding.description = event.detail.value.description
    newBuilding.metro_stop = page.data.metro_stop
    newBuilding.address = page.data.address
    newBuilding.latitude = page.data.latitude
    newBuilding.longitude = page.data.longitude
    newBuilding.photo_slider = page.data.imgSliderUrl
    newBuilding.user_id = userId
    // testing city setting data in backend
    newBuilding.city = this.data.city
    // ---------------------------------------- 
    console.log(newBuilding.picture);
    console.log(newBuilding)
    wx.request({
      url: host + `buildings?user_id${userId}`,
      method: 'post',
      data: newBuilding,
      success: function (res) {
        console.log(res)
        const id = res.data.user_id
        wx.showToast({
          title: 'Yay!',
        })
        wx.switchTab({
          url: `/pages/user/user`,
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