// pages/nowInfo/nowInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("1231231");
    (function (win) {
      var remCalc = {};
      var docEl = win.document.documentElement,
        tid,
        rem;
      function refreshRem() {
        var width = docEl.getBoundingClientRect().width;

        if (width > 640) { width = 640 }

        rem = width / 10;
        docEl.style.fontSize = rem + "px";
        remCalc.rem = rem;

        var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
        if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
          var remScaled = rem * rem / actualSize;
          docEl.style.fontSize = remScaled + "px"
        }
      }
      function dbcRefresh() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 100)
      }


      win.addEventListener("resize", function () { dbcRefresh() }, false);


      win.addEventListener("pageshow", function (e) {
        if (e.persisted) { dbcRefresh() }
      }, false);
      refreshRem();
      remCalc.refreshRem = refreshRem;
      remCalc.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === "string" && d.match(/rem$/)) { val += "px" }
        return val
      };
      remCalc.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === "string" && d.match(/px$/)) { val += "rem" }
        return val
      };
      win.remCalc = remCalc;
    })(window);

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