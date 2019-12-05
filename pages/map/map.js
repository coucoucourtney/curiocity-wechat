// pages/map/map.js

// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * Page initial data
   */
  data: {
    longitude: '',
    latitude: '',
    points: [],
    polyline: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'CNSBZ-V5BKX-KO24V-T2TXY-2XVET-YYB6H'
    });
  // },
  // backfill: function (e) {
  //   var id = e.currentTarget.id;
  //   for (var i = 0; i < this.data.suggestion.length; i++) {
  //     if (i == id) {
  //       this.setData({
  //         backfill: this.data.suggestion[i].title
  //       });
  //     }
  //   }
    var lat = 25.03682953251695, lng = 102.67484140406796;
    var temp = [{
      latitude: 25.03682953251695,
      longitude: 102.67484140406796
    },
    {
      latitude: 25.036132223872958,
      longitude: 102.67386832053477
    },
    {
      latitude: 25.035328234772695,
      longitude: 102.67441722093537
    },
    {
      latitude: 25.03587706184719,
      longitude: 102.67548958617391
    },
    {
      latitude: 25.03682953251695,
      longitude: 102.67484140406796
    },
    ]
    var polyline = [{
      points: temp,
      color: "#ff0000",
      width: 2,
      dottedLine: false
    }];
    this.setData({
      longitude: lng,
      latitude: lat,
      polyline: polyline,
      points: temp
    })
  },
  // choose location on map and get the coordinates and name/address
chooseLocation: function () {
  let that = this
  wx.authorize({
    scope: 'scope.userLocation',
    success(res) {
      console.log(res)
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          const address = res.address
          const name = res.name
          console.log(res)
          that.setData({address, name})
        }
      })
    },
    fail(err) {
      console.log(err)
    }
  })
},

  // 事件触发，调用接口
  nearby_search: function () {
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: '地铁',  //搜索关键词
      location: '39.980014,116.313972',  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
      console.log(res.data[0].title)
        // var mks = []
        // for (var i = 0; i < res.data.length; i++) {
        //   mks.push({ // 获取返回结果，放到mks数组中
        //     title: res.data[i].title,
        //     id: res.data[i].id,
        //     latitude: res.data[i].location.lat,'
        //     longitude: res.data[i].location.lng,
        //     iconPath: "/resources/my_marker.png", //图标路径
        //     width: 20,
        //     height: 20
        //   })
        // }
        // _this.setData({ //设置markers属性，将搜索结果显示在地图中
        //   markers: mks
        // })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
//** geocode form submit */
  formSubmit(e) {
    var _this = this;
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: _this.data.name, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        _this.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
          markers: [{
            id: 0,
            title: res.title,
            latitude: latitude,
            longitude: longitude,
            iconPath: './resources/placeholder.png',//图标路径
            width: 20,
            height: 20,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }],
          poi: { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          }
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  //触发关键词输入提示事件
  getsuggest: function (e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
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