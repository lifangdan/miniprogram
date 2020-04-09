// miniprogram/pages/profile/profile.js
// const db = wx.cloud.database()
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: 0,
    name: '',
    sex: '',
  },
  changeName(e) {
    console.log(7878787878)
    console.log(e.detail)
    this.data.name = e.detail;
    console.log(this.data)
  },
  getData() {
    let that=this
    console.log(app.openid)
    db.collection('profile').where({
      _openid: app.openid
}).get().then(res => {
      console.log(888888888)
      console.log(res.data)
      let info = res.data[0];
      that.setData({
        name: info.name,
        sex: info.sex,
        _id: info._id
      })
      console.log(this.data)
    })
  },
  update(e) {
    let that = this
    console.log(111111)
    console.log(that.data._id)
    console.log(that.data.name)
    db.collection('profile').doc(that.data._id).update({
      data: {
        name: that.data.name,
      },
      success: function (res) {
        console.log(8999999999)
        console.log(res)
        db.collection('profile').doc(that.data._id).get({
          success: function (res) {
            console.log(22222222)
            console.log(res)
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
          },
        })

      }
    })
    // db.collection('profile').update({
    //   data:this.data.userData
    // }).then(res => {
    //   console.log(9999)
    //   console.log(res.data)
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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