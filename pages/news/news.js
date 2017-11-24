
// pages/news/news.js
import { postRequest } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    char_lt: "<",
    char_gt: ">",
    urls:"/api/get_articles",
    allNews:[],
    hidden:true,
    pages:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var news_type = { type: 2, page: this.data.pages, per_page: 8 };
    postRequest(this.data.urls, news_type).then(res => {
      this.setData({ allNews: res.data.data });
      console.log(this.data.allNews)
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

    this.data.pages++;
    this.setData({ hidden: false });
    var news_type = { type: 2, page: this.data.pages, per_page: 8 };
    var allNews = this.data.allNews;

    postRequest(this.data.urls, news_type).then(res => {
      allNews = allNews.concat(res.data.data);
      this.setData({ allNews: allNews, hidden: true });
      if (res.data.data.length === 0) {
        wx.showToast({
          title: '已经没有更数据了',
          icon: 'success',
          duration: 1000
        })
      }
    })
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})