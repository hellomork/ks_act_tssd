/*
 * @Author: Jordan
 * @Date: 2019-07-25 09:38:48
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-14 18:16:20
 */
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router/index'
import promise from 'es6-promise'
import md5 from 'js-md5'
const Base64 = require('js-base64').Base64
// import API_LIST from '../api/config'

promise.polyfill()

const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // request timeout
})

// 请求拦截
service.interceptors.request.use(config => {
  // 接口请求加密
  // console.log('params:', config.params, 'data', config.data, 'method:', config.method)
  // if (config.url.indexOf('users/getSessionThridUserInfo.oc') > -1) {
  //   return config
  // }
  // debugger
  const par = {}
  if (config.method === 'post') {
    if (config.url.indexOf('visit/insertVisitInfo') >= 0) {
      return config
    }
    if (config.data) {
      par.data = Base64.encode(JSON.stringify(config.data))
      config.data = par
    }
  } else {
    if (config.url.indexOf('getFShareAutograph.show') >= 0) {
      return config
    }
    if (config.params) {
      par.data = Base64.encode(JSON.stringify(config.params))
      config.params = par
    }
  }

  if (config.url.indexOf('common/getSystemInfo') <= -1) {
    var timeStamp = new Date().getTime() + store.state.app.timeDiff
    var key = 'Hnszwhg'
    var secret = 'hNsZwhg@2019'
    config.headers['key'] = key
    config.headers['timestamp'] = timeStamp
    config.headers['sign'] = md5(key + timeStamp + secret)
    // const temp = window.location.href.split('/')[3]
    // if (temp === 'wx') {
    //   config.headers['locationLifeCode'] = store.state.lifeInfo.lifeCode
    // } else {
    //   config.headers['project'] = temp
    // }
    config.headers['refererer'] = window.location.href
  }

  return config
},
error => {
  // Do something with request error
  Promise.reject(error)
})

// 返回值拦截
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    // let doUrl = ''
    // if (process.env.NODE_ENV === 'production') {
    //   response.data = JSON.parse(Base64.decode(response.data))
    // }
    if (response.config.url.indexOf('share/getFShareAutograph.show') > -1) {
      return response
    }
    if (response.config.url.indexOf('visit/insertVisitInfo') > -1) {
      return response
    }
    /** ********************* 数据加密解密 ***************************** */
    response.data = JSON.parse(Base64.decode(response.data))
    const res = response.data.status
    // const len = response.config.url.length
    // if (process.env.NODE_ENV === 'development') {
    //   doUrl = response.config.url.slice(5, len)
    // } else {
    //   doUrl = response.config.url
    // }

    // 对响应数据做些事，把loading动画关掉

    // 如果访问详情接口设置分享参数
    // var shareConfig = {}
    // if (detailArr.indexOf(doUrl) > -1) {
    //   /**
    //    * 设置分享参数
    //    **/
    //   const resData = response.data.data.list[0]
    //   shareConfig.title = resData.substance.title
    //   shareConfig.url = window.location.href
    //   shareConfig.cover = resData.substance.cover
    //   store.commit('SET_SHARE', shareConfig)
    // } else {
    //   if (doUrl === 'substance/getFrontProjectDetail.show' || doUrl === 'aidedCreation/getKaAidedCreation.show') {
    //     const resData = response.data.data.list[0]
    //     shareConfig.title = resData.title
    //     shareConfig.url = window.location.href
    //     shareConfig.cover = resData.cover
    //     store.commit('SET_SHARE', shareConfig)
    //   }
    // }

    if (res.returnCode === -1) {
      Message({
        message: '系统异常',
        type: 'error',
        duration: 3 * 1000
      })
      console.log(res.msg)
      return Promise.reject(new Error(res.msg))
    } else if (res.returnCode === 300) {
      Message({
        message: '登录超时,请重新登录！',
        type: 'error',
        duration: 3 * 1000
      })
      store.commit('SET_USERINFO', null)
      router.push({ path: '/index' })
    } else {
      return response
    }
  },
  error => {
    if (error.response.status === 500) {
      Message({
        message: '没有网络，请检查网络后再试',
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      //  1.判断请求超时
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        Message({
          message: '请求超时,请重试/刷新页面！',
          type: 'error',
          duration: 3 * 1000
        })
      }
      // 接口访问失效
      if (error.response.status === 404) {
        Message({
          message: '非法请求！',
          type: 'error',
          duration: 3 * 1000
        })
      }
      // const params = {}
      // params.errorUrl = 'URL:' + window.location.href + ',API:' + error.response.config.url
      // params.errorMsg = error
      // insertError(params).then(res => {
      // //  2.需要重定向到错误页面
      //   router.push({ path: '/404' })
      // })
      return Promise.reject(error)
    }
    // store.commit('CONTROL_LOADDING', false)
  }
)
export default service
