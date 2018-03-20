//random.js
//获取应用实例
const app = getApp()
const meiziUrl = app.globalData.baseUrl.concat("/data/%E7%A6%8F%E5%88%A9/1/")
var currentPage = 0;
var mDatas = [];

Page({
  data: {
    meiziData: [],
  },

  bindViewTap: function (event) {
    console.log("bindViewTap:" + event.currentTarget.dataset.url);
    if (event.currentTarget.dataset.url == null) {
      return;
    }

    // wx.navigateTo({
    //   url: "../image/image?url=" + event.currentTarget.dataset.url
    // });

    var pictures = [event.currentTarget.dataset.url]
    wx.previewImage({
      //当前显示下表
      current: 0,
      //数据源
      urls: pictures
    })
  },

  onLoad: function () {
    console.log("生命周期函数--监听页面加载");
    console.log("baseUrl=" + app.globalData.baseUrl)
    console.log("meiziUrl=" + meiziUrl)

    var that = this
    that.getMeiziList(that);
  },

  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数")
    console.log("currentPage = " + currentPage)

    var that = this
    that.getMeiziList(that, currentPage);
  },

  getMeiziList: function (that) {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });

    currentPage = Math.round(Math.random() * (590 - 0) + 0)

    wx.request({
      url: meiziUrl + currentPage,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        if (res == null ||
          res.data == null ||
          res.data.results == null ||
          res.data.results.length == 0) {
          wx.hideToast();
          console.error("没有数据了~~");
          return;
        }

        console.log(res.data);
        mDatas=[];
        for (var i = 0; i < res.data.results.length; i++) {
          mDatas.push(res.data.results[i]);
        }

        that.setData({
          meiziData: mDatas,
        })

        wx.hideToast();
      }
    });
  },

  onReady: function () {
    console.log("生命周期函数--监听页面初次渲染完成");
  },

  onShow: function () {
    console.log("生命周期函数--监听页面显示");
  },

  onHide: function () {
    console.log("生命周期函数--监听页面隐藏");
  },

  onUnload: function () {
    console.log("生命周期函数--监听页面卸载");
  },

})
