// miniprogram/pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync("userInfo")||{}
  },
  onGetUserInfo(e){
    console.log(123456)
      console.log(e)
      let userInfo=e.detail.userInfo
      //调用云函数获取用户openid
      wx.cloud.callFunction({
        name:'login',//云函数的名称
        complete:res=>{
          userInfo.openid=res.result.openid;
          //修改data里的userInfo参数
          this.setData({
            userInfo
          })
          //存储登录信息
          wx.setStorageSync("userInfo", userInfo)
          console.log(res)
        }
      })
  },
  exitLogin(){
    console.log('退出')
    wx.removeStorageSync('userInfo')
    this.setData({
      userInfo:{}
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})