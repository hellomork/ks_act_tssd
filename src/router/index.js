import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.ROUTER_BASE,
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      redirect: '/21tssd'
    },
    {
      path: '/21tssd',
      name: '21tssd',
      component: () => import('@/views/21tssd/index'),
      meta: {
        pageTitle: '首页'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/21tssd/news'),
      meta: {
        pageTitle: '新闻快讯'
      }
    },
    {
      path: '/picshow',
      name: 'picshow',
      component: () => import('@/views/21tssd/picshow'),
      meta: {
        pageTitle: '作品展示',
        keepAlive: true
      }
    },
    {
      path: '/pic_detail/:ocCode/:sortIndex',
      name: 'pic_detail',
      component: () => import('@/views/21tssd/pic_detail/index'),
      meta: {
        pageTitle: '作品详情'
      }
    },
    {
      path: '/monselect',
      name: 'monselect',
      component: () => import('@/views/21tssd/monselect'),
      meta: {
        pageTitle: '入围作品',
        keepAlive: true
      }
    },
    {
      path: '/resultview',
      name: 'resultview',
      component: () => import('@/views/21tssd/resultview'),
      meta: {
        pageTitle: '结果公示'
      }
    },
    {
      path: '/worksubmit',
      name: 'worksubmit',
      component: () => import('@/views/21tssd/worksubmit/index'),
      meta: {
        pageTitle: '信息填写'
      }
    },
    {
      path: '/pics_edit/:id',
      component: () => import('@/views/pics/pic_edit'),
      name: 'pics_edit',
      meta: { pageTitle: '作品编辑', icon: 'app', noCache: true }
    },
    {
      path: '/pics_list',
      component: () => import('@/views/pics/list'),
      name: 'pics_list',
      meta: { pageTitle: '作品管理', icon: 'app', noCache: true }
    },
    {
      path: '/login',
      component: () => import('@/views/login/login'),
      name: 'login',
      meta: { pageTitle: '登录页', icon: 'app', noCache: true }
    }
  ]
})
