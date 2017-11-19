// pages/diurnal/diurnal.js

import { postRequest } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    char_lt: "<",
    char_gt: ">",
    journal:[],
    hidden:true,
    pages:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const urls = "/api/get_articles";
    const journal_type = { type: 1, page: this.data.pages, per_page: 1 };
    postRequest(urls, journal_type).then(res=>{
      console.log(res);
      this.setData({ journal: res.data.data});
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
    this.setData({ hidden:false});
    setTimeout(()=>{
      this.setData({ hidden: true });
    },2000)
    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
   tapItem: function (event) {
    console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: "../newsContent/newsContent?article_id=" + event.currentTarget.dataset.newsId,
    })
  },
})