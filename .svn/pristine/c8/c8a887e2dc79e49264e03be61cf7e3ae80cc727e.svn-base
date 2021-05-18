import { getShareParams } from './interface/common'
import wx from 'weixin-js-sdk'
// import { isAndroid } from '@/utils/index'
const wxService = {}
wxService.isGeted = false // 是否获取过签名，用于ios端(ios端签名只能获取一次，获取多次会错误)
// 配置微信Config
wxService.getWXConfig = function(param, successCallback, cancelCallback) {
  // 微信参数设置
  getShareParams({ url: window.location.href }).then(function(response) {
    if (response.data.status.returnCode !== -1) {
      var data = response.data.data.list[0]
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端toastr.info出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // share_appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // share_timestamp, // 必填，生成签名的时间戳
        nonceStr: data.noncestr, // share_nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // share_signature,// 必填，签名，见附录1
        jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'showOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2，onMenuShareTimeline - 分享到朋友圈，onMenuShareAppMessage- 分享给朋友
      })
      wxService.getWXConfigAfter(param, successCallback, cancelCallback)
    }
  })
}

wxService.getWXConfigAfter = function(param, successCallback, cancelCallback) {
  // var timStamp = new Date().getTime()
  // if (param.share_url.indexOf('lcCode') < 0) {
  //   if (param.share_url.indexOf('?') > -1) {
  //     param.share_url += '&lcCode=' + window.localStorage.getItem('lcCode') + '&lcName=' + window.localStorage.getItem('lcName') + '&v=' + timStamp
  //   } else {
  //     param.share_url += '?lcCode=' + window.localStorage.getItem('lcCode') + '&lcName=' + window.localStorage.getItem('lcName') + '&v=' + timStamp
  //   }
  // }
  if (param.currentDetail === '') {
    param.currentDetail = param.currentTitle
  }

  param.currentCover = param.currentCover

  // 微信分享自定义数据
  var wxData = {
    title: param.currentTitle, // 分享标题
    desc: param.currentDetail, // 分享描述
    link: param.share_url, // 分享链接
    imgUrl: param.currentCover, // 分享图标
    success: function() {
      // 用户确认分享后执行的回调函数
      successCallback()
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
    }
  }

  wx.ready(function() {
    // 分享给朋友回调
    /** ****************1.4.0以前的版本***************** */
    // wx.onMenuShareAppMessage(wxData)
    /** *********************************************** */
    wx.updateAppMessageShareData(wxData)
    // 分享到QQ回调
    wx.onMenuShareQQ(wxData)
    // 分享到腾讯微博回调
    wx.onMenuShareWeibo(wxData)
    // 分享到QQ空间回调
    wx.onMenuShareQZone(wxData)
    // 分享到朋友圈回调
    /** ****************1.4.0以前的版本***************** */
    // wx.onMenuShareTimeline({
    //   title: param.currentTitle, // 分享标题
    //   link: param.share_url, // 分享链接
    //   imgUrl: param.currentCover, // 分享图标
    //   success: function() {
    //     // 用户确认分享后执行的回调函数
    //     successCallback()
    //   },
    //   cancel: function() {
    //     // 用户取消分享后执行的回调函数
    //     if (cancelCallback) { cancelCallback() }
    //   }
    // })
    /** ************************************************** */
    wx.updateTimelineShareData({
      title: param.currentTitle, // 分享标题
      link: param.share_url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: param.currentCover, // 分享图标
      success: function() {
        // 设置成功
        successCallback()
      }
    })
  })
}
// 详情页面设置微信参数
wxService.setWXConfig = function(param, successCallback, cancelCallback) {
  if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) { // 安卓系统每个详情界面都要获取微信jdk
    wxService.getWXConfig(param, successCallback, cancelCallback)
  } else { // ios系统只获取一次微信jdk
    if (wxService.isGeted) {
      wxService.getWXConfigAfter(param, successCallback, cancelCallback)
    } else {
      wxService.isGeted = true
      wxService.getWXConfig(param, successCallback, cancelCallback)
    }
  }
}

export default wxService
