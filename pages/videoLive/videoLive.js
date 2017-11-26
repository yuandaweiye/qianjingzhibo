// pages/live/live.js
import { postRequest } from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoData: {},
    userInfo: {},
    userMessages: [],
    room_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const video_id = options.video_id;
    this.setData({ room_id: video_id })
    postRequest("/api/get_studio_detail", { studio_id: video_id }).then(res => {
      this.setData({ videoData: res.data.data })
      console.log(this.data.videoData);
      var that = this;
      // 获取用户信息
      wx.getStorage({
        key: 'member_id',
        success: function (res) {
          that.setData({ userInfo: res.data });
          console.log(that.data.userInfo);
        }
      })
    });
    postRequest("/api/get_comments", { studio_id: this.data.room_id }).then(res => {
      this.setData({
        userMessages: res.data.data,
      })
      console.log(this.data.userMessages)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  formSubmit: function (e) {
    if (e.detail.value.mess == "") {
      return;
    } else {
      if (this.data.userInfo.type == 1) {
        // 普通会员发言

        postRequest("/api/add_comment", { studio_id: this.data.room_id, member_id: this.data.userInfo.member_id, content: e.detail.value.mess }).
          then(res => {
            console.log(res);
          }).then(() => {
            // 获取用户发言
            postRequest("/api/get_comments", { studio_id: this.data.room_id }).then(res => {
              this.setData({
                userMessages: res.data.data,
                userInp: ""
              })
            })
          })
      }
    };
  },

  onShow: function () {
    this.data.ITime = setInterval(() => {
      postRequest("/api/get_comments", { studio_id: this.data.room_id }).then(res => {
        this.setData({
          userMessages: res.data.data,
        })
      })
    }, 2000);
  },
  onHide: function () {
    clearTimeout(this.data.ITime);
    this.setData({ ITime: null });
  }
})