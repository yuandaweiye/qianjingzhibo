// pages/textLive/textLive.js
import { postRequest } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInp:"",
    user_id:"",
    user_type:"",
    room_id:"",
    userMessages:[],
    masterMessage:[],
    ITime: null,
    isTop:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var text_id = options.text_id;
    this.setData({ room_id: text_id});
    var that=this;
    // /api/get_studio_detail
      wx.getStorage({
        key: 'member_id',
        success: function(res) {
          console.log(res);
          that.setData({
            user_id: res.data.member_id,
            user_type: res.data.type
          })
        },
        fail:function(res){
          wx.showToast({
            title: '您尚未登录',
            icon: 'info',
            duration: 1500,
            success: function (res) {
              setTimeout(()=>{
                wx.switchTab({
                  url: '../logs/logs',
                })
              },1500)

            }
          })
        }
      })
      

        // / api / get_comments
        // 获取用户发言
      postRequest("/api/get_comments", { studio_id: this.data.room_id}).then(res=>{
        this.setData({
          userMessages:res.data.data
        })
        console.log(this.data.userMessages);
      });
      //获取老师发言 
      postRequest("/api/get_notes", { studio_id: this.data.room_id, is_top: 0 }).then(res => {
        this.setData({ masterMessage: res.data.data, userInp: "" })
      });
      postRequest("/api/get_notes", { studio_id: this.data.room_id, is_top: 1 }).then(res => {
        this.setData({ isTop: res.data.data });
        
      });
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
  formSubmit: function (e) {
    if (e.detail.value.mess==""){
        return;
    }else{
      if (this.data.user_type==1){
        // 普通会员发言
        
        postRequest("/api/add_comment", { studio_id: this.data.room_id, member_id: this.data.user_id, content: e.detail.value.mess}).
        then(res=>{
          console.log(res);
        }).then(()=>{
          // 获取用户发言
          postRequest("/api/get_comments", { studio_id: this.data.room_id }).then(res => {
            this.setData({
              userMessages: res.data.data,
              userInp:""
            })
          })
        })
      }else{
        // 老师发言
        postRequest("/api/add_note", { studio_id: this.data.room_id, member_id: this.data.user_id, content: e.detail.value.mess, is_top:0})
        .then(res=>{
          console.log(res);
        }).then(()=>{
          postRequest("/api/get_notes", { studio_id: this.data.room_id, is_top:0}).then(res=>{
                 this.setData({ masterMessage : res.data.data})
            })
        })
      }
      
    };
  },
  onShow:function(){
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