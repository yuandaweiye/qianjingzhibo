// pages/login/login.js
const app = getApp()
import { postRequest } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    useruser_name: '',
    password: ''
  },
  /**
   * 监听密码输入
   */
  listenerPassword: function (e) {
    this.data.password = e.detail.value;
  },
  /**
    * 监听手机号输入
    */
  listenerUsername: function (e) {
    this.data.useruser_name = e.detail.value;
  },
  /**
   * 监听登录按钮
   */
  listenerLogin: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          this.setData({
            code: res.code
          })
          var data = {
            code: res.code,
            user_name: this.data.useruser_name,
            password: this.data.password
          }
          postRequest("/api/login", data).
            then(res => {
              if (res.data.error_code == 0) {
                wx.setStorage({
                  key: 'member_id',
                  data: res.data.data.member_id,
                })
                wx.showToast({
                  title: '登陆成功',
                  icon: 'success',
                  duration: 1200,
                  success: function (res) {
                    wx.switchTab({
                      url: '../logs/logs',
                    })
                  }
                })
              }else{
                wx.showToast({
                  title: '账号或密码错误请重新登录',
                  icon: 'loading',
                  duration: 1800
                })
              }
            }).
            catch(err => { alert(err) });
        }
      }
    })
  },
  /**
   * listenerCancel
   */
  listenerCancel: function () {
    console.log("取消")
    // var that = this
    // this.setData({
    //   useruser_name,
    //   password
    // })
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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