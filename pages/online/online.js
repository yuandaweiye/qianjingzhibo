// pages/online/online.js
import { postRequest } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Livevideo:[],
    Textbroadcast:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const urls ='/api/get_studios';
    postRequest(urls,{type:1}).then(res=>{
      this.setData({Livevideo:res.data.data});
    })
    postRequest(urls,{type:2}).then(res=>{
      this.setData({ Textbroadcast: res.data.data });
      console.log(this.data.Textbroadcast);
    })
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
  
  },
  toVideo:function(event){
    wx.navigateTo({
      url: "../videoLive/videoLive?video_id=" + event.currentTarget.dataset.videoId,
    })
  },
  toText: function (event) {
    console.log(event);
    wx.navigateTo({
      url: "../textLive/textLive?text_id=" + event.currentTarget.dataset.textId,
    })
  }

})