/*
 * @Author: Jordan
 * @Date: 2019-07-24 19:01:46
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-10-14 10:22:00
 */
import { login, loginOut } from '@/api/interface/user'
const app = {
  state: {
    userInfo: null,
    isMobile: false,
    timeDiff: 0,
    uploadParams: null,
    device: null,
    cityName: null, // 所在城市
    longitude: null, // 用户所在纬度
    latitude: null, // 用户所在经度
    publishStatus: 0
  },

  mutations: {
    SET_PUBLISHOVER: (state, publishStatus) => {
      state.publishStatus = publishStatus
    },
    SET_DEVICE: (state, device) => {
      state.device = device
    },
    SET_POSITION: (state, position) => {
      state.position.latitude = position.latitude
      state.position.longitude = position.longitude
    },
    SET_CITY: (state, cityName) => {
      state.cityName = cityName
    },
    SET_LONGITUDE: (state, longitude) => {
      state.longitude = longitude
    },
    SET_LATITUDE: (state, latitude) => {
      state.latitude = latitude
    },
    SET_MAPDATA: (state, obj) => {
      state.cityName = obj.city
      state.longitude = obj.bounds.northeast.lng
      state.latitude = obj.bounds.northeast.lat
      state.latitude = obj.bounds.northeast.lat
    },
    SET_UPLOADPARAMS: (state, uploadParams) => {
      state.uploadParams = uploadParams
    },
    SET_ISMOBILE: (state, isMobile) => {
      state.isMobile = isMobile
    },
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
    },
    SET_USERINFOLOGIN: (state, userinfologin) => {
      state.userinfologin = userinfologin
    },
    SET_SYSTIME: (state, timeDiff) => {
      state.timeDiff = timeDiff
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      const { userCode, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ userCode: userCode.trim(), password: password }).then(response => {
          const { data } = response
          commit('SET_USERINFOLOGIN', response.data.data.list[0].user)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户登出
    loginOut({ commit }) {
      return new Promise((resolve, reject) => {
        loginOut().then(res => {
          commit('SET_USERINFOLOGIN', null)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default app
