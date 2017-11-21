// pages/alterName/alterName.js
const app = getApp()
import { postRequest } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick_name:''
  },
  /**
 * 监听昵称的输入
 */
  listenernick_name: function (e) {
    this.data.nick_name = e.detail.value;
  },
  /**
* 监听确认修改按钮
*/
  listenerConfirm: function () {
    var that = this
    wx.getStorage({
      key: 'member_id',
      success: function (res) {
        that.setData({
          member_id: res.data
        })
        var data = {
          member_id: res.data,
          nick_name: that.data.nick_name
        }
        postRequest("/api/edit_nick_name", data).
          then(res => {          
            if (res.data.error_code == 0){
              wx.showToast({
                title: '昵称修改成功',
                icon: 'success',
                duration: 1800,
                success: function (res) {
                  wx.switchTab({
                    url: '../logs/logs',
                  })
                }
              })
            }else{
              wx.showToast({
                title: '昵称修改失败',
                icon: 'loading',
                duration: 1800
              })
            }
          }).
          catch(err => { alert(err) });
      },
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