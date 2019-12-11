// pages/building_create/building_create.js
// 引入SDK核心类
import Toast from '../../dist/toast/toast';

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
    district: "",
    address: ""
  },

  onLoad: function () {
    this.setData({login: getApp().globalData.login})
    console.log(getApp().globalData)
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

  removeMainPic: function () {
    let page = this
    let imgUrl = page.data.imgUrl
    page.setData({
      imgUrl: ""
    })
    console.log(page.data.imgUrl);
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
            console.log("res",res)
            const address = res.address
            const name = res.name
            const latitude = res.latitude
            const longitude = res.longitude
            const district = address.substr(3, 3)
            if (name.length == 0) {
              Toast.fail('Please reenter address');
            } else {
              page.setData({ address, name, latitude, longitude, district })
              page.nearby_search();
            }
          }
        })
      },
      fail(err) {
        console.log("err", err)
      }
    })
  },

  nearby_search: function () {
    var page = this;
    const lat = page.data.latitude;
    const lgt = page.data.longitude;
    // 调用接口
    qqmapsdk.search({
      keyword: '地铁',  //搜索关键词
      location: `${lat},${lgt}`,  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        const metro_stop = res.data[0].title;
        page.setData({
          metro_stop
        })
      },
    })
  },

  getUserInfo: function(e) {

    const page = this
    console.log("E", e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.login = true
    const userId = app.globalData.userId;
    console.log("userId line 12", userId)
    // can you do an if statement back here to run login if person doesnt have avatar using url /users 
    page.setData({
      userInfo: e.detail.userInfo
    })
    console.log("line 16", page.data.userInfo)

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
        page.setData({login: true})
        // page.createBuilding(e)
      }
    })
    // }
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
    newBuilding.district = page.data.district
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
    console.log(newBuilding.picture);
    console.log(newBuilding)

    if (newBuilding.name == "" || newBuilding.main_picture == "" || newBuilding.main_photo_credit == "" || newBuilding.address == "" ) {
      Toast.fail('Please complete all * fields');

    } else {
      wx.request({
        url: host + "buildings",
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
    }
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
