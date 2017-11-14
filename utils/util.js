const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getData=(url,data)=>{

  const servers ="http://42.121.131.12:6363";
  var url =servers+url;
  var data= data || {};
    wx.request({
      url: url,
      data:data,
      success:(res)=>{
       const { data } ={res:{data:{ data } } };
      }
    })

    return data;

}

import Promise from './bluebird.js';

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};


// post请求方式
const postRequest=(url, data)=> {
  var postRequest = wxPromisify(wx.request)
  const servers = "http://42.121.131.12:6363";
  var url = servers + url;
  var data=data||{};
  return postRequest({
    url: url,
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
  })
}



// get请求方式
const getRequest=(url, data)=>{
  var getRequest = wxPromisify(wx.request)
  return getRequest({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json'
    }
  })
}

module.exports = {
  formatTime: formatTime,
  postRequest: postRequest
}
