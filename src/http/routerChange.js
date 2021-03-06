import router from '../router'
// import apis from '@/api/interface/index'
// // updateRead, behavior
import { insertVistor } from '../api/interface/common.js'
import store from '../store'

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  window.sessionStorage.setItem('urlFlag', from.fullPath)
  next()
})

router.afterEach((to, from) => {
  // const _url = window.location.origin + '/20syds' + from.fullPath
  window.scroll(0, 0)
  document.title = to.meta.pageTitle
  /**
   * 录入访客信息
   */
  const visitParams = {}
  visitParams.menusId = ''
  visitParams.visitTitle = '“童声诵党”庆祝建党100周年昆山省少儿朗诵大赛'
  setVistor(visitParams)

  function setVistor(visitParams) {
    visitParams.visitorCity = store.state.app.cityName
    visitParams.visitorLatitude = store.state.app.latitude
    visitParams.visitorLongitude = store.state.app.longitude
    visitParams.visitUrl = window.location.href
    visitParams.visitorClient = store.state.app.device // 设备信息：0-安卓web；1-安卓app；2-苹果web；3- 苹果app；4- pc
    insertVistor(visitParams)
  }
  // const visitOld = {}
  // visitOld.isApp = false
  // visitOld.visitTitle = '“童声诵党”庆祝建党100周年昆山省少儿朗诵大赛'
  // setVistorOld(visitOld)

  // function setVistorOld(visitOld) {
  //   insertVistorOld(visitOld)
  // }
})
