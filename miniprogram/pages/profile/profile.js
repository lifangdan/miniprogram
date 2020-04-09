// miniprogram/pages/profile/profile.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: {}
  },
  getData() {
    db.collection('profile').get().then(res => {
      console.log(888888888)
      console.log(res.data)
      this.setData({
        userData: res.data[0]
      })
      console.log(this.data.userData)
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  changeName(e){
      console.log(7878787878)
      console.log(e.detail)
      this.setData({
        'userData.name': e.detail,
      });
      console.log(this.data.userData)
  },
  update(e) {
    var that = this
    let id = this.data.userData._id
    let name = this.data.userData.name
    console.log(111111)
    console.log(db.collection('profile'))
    db.collection('profile').doc(id).update({
      data: {
          name:'aa'
      },
      success: function (res) {
        console.log(8999999999)
        that.setData({
          'userData.name':name,
        });
        console.log(res)
        
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