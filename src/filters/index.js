/*
 * @Author: Jordan
 * @Date: 2019-08-27 20:32:23
 * @Last Modified by: Jordan
 * @Last Modified time: 2020-01-02 14:25:40
 */

import { formatDate } from '@/utils/date'
const globalFilters = {}
globalFilters.install = (Vue) => {
  // 自定义格式化时间
  Vue.filter('formatTime', function(value, type) {
    if (value) {
      return formatDate(new Date(value), type)
    }
  })

  Vue.filter('substr', function(input, num) {
    if (input !== null && input !== undefined) {
      if (input.length > num) {
        input = input.substring(0, num) + '...'
      }
    }
    return input
  })

  Vue.filter('formatMobile', function(value) {
    if (value !== null && value !== undefined) {
      value = value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
    return value
  })

  Vue.filter('idNumberToStar', function(value) {
    if (value !== null) {
      var str = String(value)
      var reg = str.slice(-13, -4)
      return str.replace(reg, '****')
    }
  })
  Vue.filter('listToStr', function(value) {
    if (value.length > 0) {
      var str = value.join(',')
      return str
    }
  })
}

export default globalFilters
