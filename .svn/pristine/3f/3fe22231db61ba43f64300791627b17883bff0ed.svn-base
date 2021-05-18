// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import Router from 'vue-router'
import Cookies from 'js-cookie'
import apis from '@/api/service'
import store from './store'
// element组件
import Element from 'element-ui'
import Vant from 'vant'
// 路由拦截
import './http/routerChange'
// 样式
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import '@/style/index.scss'
import '@/assets/icons/index'
import interfaceList from '@/api/interface/user'
import globalFilters from '@/filters/index'
import Router from 'vue-router'
import bus from './utils/eventBus'
// // 调试
// import Vconsole from 'vconsole'

// 富文本
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { isIOS } from './utils'

Vue.prototype.bus = bus
Vue.config.productionTip = false
// Vue.prototype.$vConsole = new Vconsole()
// if (process.env.NODE_ENV === 'development') {
//   require('./mock/index.js')
// }
Vue.use(Vant).use(apis).use(globalFilters).use(VueAwesomeSwiper).use(VueQuillEditor, { placeholder: '请输入作品简介' }).use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 修改重复路由报错信息
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 配置项目名称
if (isIOS()) {
  store.commit('SET_DEVICE', 2)
} else {
  store.commit('SET_DEVICE', 0)
}
// 检测平台
var nowMachineWidth = document.body.clientWidth
if (nowMachineWidth < 750) {
  store.commit('SET_ISMOBILE', true)
} else {
  store.commit('SET_ISMOBILE', false)
}
/* eslint-disable no-new */
interfaceList.getSysTime().then(resData => {
  var sysTime = resData.data.data.timestamp
  console.log('sysTime', sysTime)
  store.commit('SET_SYSTIME', sysTime)
  // interfaceList.getMapData(() => {
  interfaceList.getSession().then(res => {
    store.commit('SET_USERINFO', res.data.data.list[0].thrid_user)
    interfaceList.getSessionLogin().then(res => {
      store.commit('SET_USERINFOLOGIN', res.data.data.list[0].user)
      interfaceList.getSignature().then(resUploadData => {
        store.commit('SET_UPLOADPARAMS', resUploadData.data.data.list[0])
        /* eslint-disable no-new */
        new Vue({
          el: '#app',
          router,
          store,
          components: { App },
          template: '<App/>'
        })
      })
    })
  })
  // })
})
