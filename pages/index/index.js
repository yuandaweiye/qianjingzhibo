//index.js
//获取应用实例
const app = getApp()
import { postRequest } from '../../utils/util.js';
Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    // banner图的设置
      bannerUrls:[],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
     // banner行情大厅
     DirectseedingHall:[],
    // 新闻资讯列表接口
     newsList:[],
     quotation:[]

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 直播大厅的接口
  // /api / get_index_studios
  // 首页资讯
  // api/get_index_articles
  // 获取资讯列表接口/api/get_articles
  onLoad: function () {
    // 获取banner图设置banner图
        postRequest("/api/get_banners").
            then(res=>{
              this.setData({ bannerUrls: res.data.data})
            }).
            catch(err=>{alert(err)});
  
    // 直播大厅的接口
        postRequest("/api/get_index_studios").then(res=>{
            this.setData({ DirectseedingHall:res.data.data});
        }).catch(err=>{console.log(err)});

     //获取新闻资讯接口 
        postRequest("/api/get_articles").then(res => {
          this.setData({ newsList: res.data.data });
        }).catch(err => { console.log(err) });
      //获获取首页行情中心/api/get_index_market

        postRequest("/api/get_index_market").then(res => {
          // console.log(res.data.result)
          var newquotation=[];
          // this.setData({ quotation: res.data.result });
          res.data.result.map((value)=>{
            value.change_percent = (value.change_percent * 100).toFixed(2) > 0 ? "+" + (value.change_percent * 100).toFixed(2) : "-" + (value.change_percent * 100).toFixed(2);
            value.change = (value.change_percent * 100).toFixed(2) > 0 ? "+" + value.change : "-" + value.change;
            newquotation.push(value)
          });

          console.log(newquotation)
          this.setData({ quotation: newquotation})
        }).catch(err => { console.log(err) });


  },


  tapItem: function (event){
    console.log(event.currentTarget.dataset.newsId);
    wx.navigateTo({
      url: "../newsContent/newsContent?article_id=" + event.currentTarget.dataset.newsId,
    })
  },


  getUserInfo: function(e) {
  }
})
