// pages/building_edit/building_edit.js
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
  onLoad: function (options) {
// LOADING INFO ABOUT THE BUILDING ON LOAD
    const page = this
    const id = options.id
    wx.request({
      url: host + `buildings/${id}`,
      success: function (res) {
        const building = res.data
        console.log(building)
        page.setData({ building })
        page.setData({ building, imgSliderUrl: building.photo_slider })
      }
    })

// LOADING PICTURE TAKER ON LOAD
    const loginStatus = wx.getStorageSync("login")
    const userId = wx.getStorageSync("userId")

    this.setData({ login: loginStatus, userId: userId})
    console.log("data", this.data)
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

  removePic: function (e) {
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
            console.log("res", res)
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

  getUserInfo: function (e) {

    const page = this
    console.log("E", e)
    wx.setStorageSync("userInfo", e.detail.userInfo)
    wx.setStorageSync("login", true)
    const userId = app.globalData.userId;
    // console.log("userId line 12", userId)
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
        page.setData({ login: true })
        // page.createBuilding(e)
      }
    })
    // }
  },

  editBuilding: function (event) {
    console.log(event)
    const page = this;
    const userId = wx.getStorageSync("userId");
    let id = page.data.building.id
    let editBuilding = {};
    // BUILDING VALUES -----------------------------
    editBuilding.name = event.detail.value.name
    editBuilding.main_picture = page.data.imgUrl
    editBuilding.main_photo_credit = event.detail.value.main_photo_credit
    editBuilding.address = event.detail.value.address
    editBuilding.old_address = event.detail.value.old_address
    editBuilding.neighborhood = event.detail.value.neighborhood
    editBuilding.district = page.data.building.district
    editBuilding.year = event.detail.value.year
    editBuilding.architects = event.detail.value.architects
    editBuilding.architectural_style = event.detail.value.architectural_style
    editBuilding.description = event.detail.value.description
    editBuilding.metro_stop = page.data.metro_stop
    editBuilding.latitude = page.data.latitude
    editBuilding.longitude = page.data.longitude
    console.log(editBuilding.picture);
    console.log(editBuilding)

    console.log('entered wx request')
    wx.request({
      url: host + `buildings/${id}`,
      method: 'put',
      data: editBuilding,
      success: function (res) {
        console.log(res)
        const id = res.data.id
        wx.showToast({
          title: 'Done!',
          // change to building show page
        })
        // FIX THIS
        wx.navigateBack({
          url: `/pages/building_show/building_show?id=${id}`,
        })
      }
    })
  },

  destroyBuilding: function (e) {
    const id = this.data.building.id
    wx.showModal({
      title: 'Are you sure you want to delete this building?',
      content: 'This action is permanent!',
      cancelText: "Cancel",
      confirmText: "OK",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: host + `buildings/${id}`,
            method: 'delete',
            success: (res) => {
              console.log(res)
              wx.switchTab({
                url: '/pages/buildings_index/buildings_index',
              })
            }
          })
        } else if (res.cancel) {

        }
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
  onShow: function () {
    const loginStatus = wx.getStorageSync("login")
    this.setData({ login: loginStatus })

  },

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