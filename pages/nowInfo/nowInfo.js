import { postRequest } from '../../utils/util.js';
Page({
  data: {
    journal:[],
    news:[]
  },
  onLoad: function () {
    // 获取日刊/api/get_articles
    const urls = "/api/get_articles";
    const journal_type = { type: 1, page: 1, per_page: 5 };
    const news_type = { type: 2, page: 1, per_page: 5 };
    postRequest(urls, journal_type ).then(res=>{
      console.log(res)
      this.setData({
        journal:res.data.data
      })
    });
    postRequest(urls, news_type).then(res => {
      this.setData({
        news: res.data.data
      })
      console.log(this.data.news)
    });
  },

   tapItem: function (event) {
     console.log(event.currentTarget.dataset);
    wx.navigateTo({
      url: "../newsContent/newsContent?article_id=" + event.currentTarget.dataset.newsId,
    })
  },
})  