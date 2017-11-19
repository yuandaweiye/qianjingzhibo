import { postRequest } from '../../utils/util.js'
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    data_01: [],
    data_02: [],
    data_03: [],
    data_05: [],
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */

    postRequest("/api/get_market",{type:1}).then(res=>{

      var newquotation = [];
      res.data.result.map((value) => {
        value.change_percent = (value.change_percent * 100).toFixed(2) > 0 ? "+" + (value.change_percent * 100).toFixed(2) : (value.change_percent * 100).toFixed(2);
        value.change = (value.change_percent * 100).toFixed(2) > 0 ? "+" + value.change : value.change;
        newquotation.push(value)
      });

      that.setData({ data_01: newquotation });
    })





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
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
    postRequest("/api/get_market", { type: e.detail.current+1}).then(res=>{
      console.log(res.data);
      var newquotation = [];
      res.data.result.map((value) => {
        value.change_percent = (value.change_percent * 100).toFixed(2) > 0 ? "+" + (value.change_percent * 100).toFixed(2) : (value.change_percent * 100).toFixed(2);
        value.change = (value.change_percent * 100).toFixed(2) > 0 ? "+" + value.change :  value.change;
        newquotation.push(value)
      });
      switch (e.detail.current){
        case 0:
          that.setData({ data_01: newquotation });break;
        case 1:
          that.setData({ data_02: newquotation }); break;
        case 2:
          that.setData({ data_03: newquotation }); break;
        case 3:
          that.setData({ data_04: newquotation }); break; 

      }
    })

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})  