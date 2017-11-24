import { postRequest } from '../../utils/util.js'
Page({
  data: {
    /** 
        * ҳ������ 
        */
    winWidth: 0,
    winHeight: 0,
    currentTab:0,
    data_01: [],
    data_02: [],
    data_03: [],
    data_05: [],
    ITime:null,
  },
  onLoad: function () {
    var that = this;
    this.getDatas();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  /** 
     * 滑动事件
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    // // 去获取一第一次
    // this.getDatas(e.detail.current);

    

    
   },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({currentTab: e.target.dataset.current})
    }
  },

  // 获取数据的方法
  getDatas:function(){
    var i=[1,2,3,4];
    i.map((value)=>{
      console.log(value);
      postRequest("/api/get_market", { type: value }).then(res => {
        var newquotation = [];
        res.data.result.map((value) => {
          value.change_percent = (value.change_percent * 100).toFixed(2) > 0 ? "+" + (value.change_percent * 100).toFixed(2) : (value.change_percent * 100).toFixed(2);
          value.change = (value.change_percent * 100).toFixed(2) > 0 ? "+" + value.change : value.change;
          newquotation.push(value)
        });
        switch (value) {
          case 1:
            this.setData({ data_01: newquotation }); break;
          case 2:
            this.setData({ data_02: newquotation }); break;
          case 3:
            this.setData({ data_03: newquotation }); break;
          case 4:
            this.setData({ data_04: newquotation }); break;

        }
      })


    })

  },

  onReady:function(){
    
  },
    
 onShow: function () {
  //  var ITime = null;
   this.data.ITime = setInterval(() => { this.getDatas() }, 5000);
  },
 onHide: function () {
   clearTimeout(this.data.ITime);
   this.setData({ITime:null})
 },
})  