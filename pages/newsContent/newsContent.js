// pages/newsContent/newsContent.js
import { postRequest } from '../../utils/util.js';
import  WxParse  from '../../utils/lib/wxParse.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      article_title:"",
      article_content:"",
      create_time:"",
      contents:"",
      article_author:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取新闻资讯
    const article_id = options.article_id;
    postRequest("/api/get_article_detail", { id: article_id}).then((res)=>{
      // var nowarticle = res.data.data;
      // nowarticle = wxParse('article_content', 'html', res.data.data.content,this)
      // console.log(nowarticle);
      console.log(res);
      this.setData({
        article_title: res.data.data.title,
        conntent: WxParse.wxParse('article_content','html',res.data.data.content,this,5),
        create_time: res.data.data.create_time,
        article_author: res.data.data.author
      })
      console.log(this.data.article_content);
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
  
  }
})