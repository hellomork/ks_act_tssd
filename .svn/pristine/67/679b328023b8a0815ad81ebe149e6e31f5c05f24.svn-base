import service from '@/http/HttpInterceptor.js'
import API_LIST from '@/api/config'

/**
 * 获取session信息
 *
 */
export const getSession = () => {
  return service({
    url: API_LIST.user.info,
    method: 'get'
  })
}

/**
 * 获取后台用户登陆信息
 *
 */
export const getSessionLogin = () => {
  return service({
    url: API_LIST.user.infoLogin,
    method: 'get'
  })
}
/**
 *
 */
export const insertArt = (params) => {
  return service({
    url: API_LIST.user.insertArt,
    method: 'post',
    data: params
  })
}

/**
 *
 */
export const updateArt = (params) => {
  return service({
    url: API_LIST.user.updateArt,
    method: 'post',
    data: params
  })
}

/**
 *
 */
// export const getList = (params) => {
//   return service({
//     url: API_LIST.user.getList,
//     method: 'get',
//     params: params
//   })
// }

/**
 *
 */
export const getDetail = (params) => {
  return service({
    url: API_LIST.user.getDetail,
    method: 'get',
    params: params
  })
}

/**
 * 用户登录
 * @params {*} password
 * @params {*} userCode
 */
export const login = (params) => {
  return service({
    url: API_LIST.user.login,
    method: 'post',
    data: params
  })
}

export const getLoginPic = (params) => {
  return service({
    url: API_LIST.user.loginPic,
    method: 'get',
    params: params
  })
}

/**
 * 获取签名
 * @params {*} password
 * @params {*} userCode
 */
export const getSignature = (params) => {
  return service({
    url: API_LIST.user.signature,
    method: 'post',
    data: params
  })
}

/**
 * 用户登出
 */
export const loginOut = () => {
  return service({
    url: API_LIST.user.loginOut,
    method: 'get'
  })
}
/**
 * 用户投稿绑定/注册
 */
export const bindMobile = (params) => {
  return service({
    url: API_LIST.user.bindMobile,
    method: 'post',
    data: params
  })
}
/**
 * 获取手机验证码
 * mobile
 */
export const getVerifyCodes = (params) => {
  return service({
    url: API_LIST.user.verifyCodes,
    method: 'get',
    params: params
  })
}
/**
 * 校对验证码
 * code
 */
export const checkVerifyCodes = (params) => {
  return service({
    url: API_LIST.user.checkCodes,
    method: 'get',
    params: params
  })
}

export default Object.assign({
  getSession,
  insertArt,
  updateArt,
  // getList,
  getDetail,
  login,
  getLoginPic,
  loginOut,
  getSignature,
  bindMobile,
  getVerifyCodes,
  checkVerifyCodes,
  getSessionLogin
})
