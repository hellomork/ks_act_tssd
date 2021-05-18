
/*
 * @Author: Jordan
 * @Date: 2019-07-25 11:07:16
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-04-15 11:15:05
 */

import apiList from './index'
const install = Vue => {
  if (install.installed) {
    return
  }
  install.installed = true
  Object.defineProperty(Vue.prototype, '$apis', {
    get() {
      return apiList
    }
  })
}
export default install
