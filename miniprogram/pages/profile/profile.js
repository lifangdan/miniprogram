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
    date: '',
    record: '',
    native: '',
    address: '',
    tempImg: '',
    fileList: [],
    fileIDs: [],
  },
  changeName(e) {
    this.data.name = e.detail;
  },
  getData() {
    let that = this
    db.collection('profile').get().then(res => {
      let info = res.data[0];
      that.setData({
        name: info.name,
        sex: info.sex,
        date: info.date,
        record: info.record,
        native: info.native,
        address: info.address,
        _id: info._id
      })
    })
  },
  update(e) {
    let that = this
    db.collection('profile').doc(that.data._id).update({
      data: {
        name: that.data.name,
      },
      success: function (res) {
        db.collection('profile').doc(that.data._id).get({
          success: function (res) {
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
          },
        })

      }
    })
  },
  /**
   * 上传
   */
  afterRead(event) {
    let that = this;
    console.log(event)
    wx.cloud.uploadFile({
      cloudPath: (new Date()).getTime() + '.png',
      filePath: event.detail.file.path, // 文件路径
    }).then(res => {
      wx.cloud.getTempFileURL({
        fileList: [res.fileID],
        success: res => {
          let fileList = res.fileList[0]
          //将照片更新到云数据库中
          db.collection('fileList').add({
            data: {
              url: fileList.tempFileURL,
              name: (new Date()).getTime() + '.png',
              fileID: '',
              fileID: fileList.fileID
            }
          }).then(res => {
            that.getTempFileURL()
            wx.showToast({
              title: '上传成功',
            })

          }).catch(error => {
            console.log(error)
          })
        }, fail: err => {
        }
      })

    }).catch(error => {
      console.log('上传失败')
      // handle error
    })
  },
  /**
   * 读取云数据库图片真实路径
   */
  getTempFileURL() {
    let that = this;
    db.collection('fileList').get().then(res => {
      that.setData({
        fileList: res.data,
      })
    })

  },

  delData(e){
    let that = this
    let fileID = e.detail.file.fileID
    db.collection('fileList').doc(e.detail.file._id).remove({
      success: function(res) {
        console.log(res)
        that.data.fileList.splice(that.data.fileList.findIndex(v => v.fileID == fileID), 1);
        let newList = that.data.fileList
        that.setData({
          fileList: newList,
        })
        wx.showToast({
          title: '删除成功',
        })
        that.delImg(e)
      }
    })
  },
    /**
   * 删除云数据库图片
   */
  delImg(e) {
    let fileID = e.detail.file.fileID
    wx.cloud.deleteFile({
      fileList: [fileID]
    }).then(res => {
    }).catch(error => {
    })
  },
  /**
   * 小程序自带上传方法
   */
  uploadImgHandle() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          tempImg: tempFilePaths
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getTempFileURL()
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