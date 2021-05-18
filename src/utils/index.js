/*
 * @Author: Jordan
 * @Date: 2019-08-23 14:30:57
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-04-15 10:59:20
 */
import { formatDate } from '@/utils/date'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function formatTimeDate(value, type) {
  if (value) {
    return formatDate(new Date(value), type)
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][ value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
   * @param {number} time
   * @param {string} option
   * @returns {string}
   */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
    )
  }
}

/**
   * @param {string} url
   * @returns {Object}
   */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * base64转二进制
 * @param {String} base64Str
 */
export function convertBase64UrlToBytes(base64Str) {
  var bytes = window.atob(base64Str.split(',')[1])
  var ia = new Array(bytes.length)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return ia
}
/**
 * 手机号码正则验证
 * @param {String} value
 */
export function checkMobile(value) {
  if (!(/^1[3456789]\d{9}$/.test(value))) {
    return false
  } else {
    return true
  }
}
/**
 * 身份证正则验证
 * @param {String} value
 */
// export function checkID(value) {
// 验证身份证
export function checkID(num) {
  if (num === '' || num === null) {
    return false
  }
  num = num.toUpperCase()
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
    // alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
    return false
  }
  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  // 下面分别分析出生日期和校验位
  var len, re
  len = num.length
  if (len === 15) {
    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
    var arrSplit = num.match(re)

    // 检查生日日期是否正确
    var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
    var bGoodDay
    bGoodDay = (dtmBirth.getYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
    if (!bGoodDay) {
      // alert('输入的身份证号里出生日期不对！');
      return false
    } else {
      // 将15位身份证转成18位
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var nTemp = 0
      var i
      num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i]
      }
      num += arrCh[nTemp % 11]
      return true
    }
  }
  if (len === 18) {
    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
    arrSplit = num.match(re)

    // 检查生日日期是否正确
    dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
    bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
    if (!bGoodDay) {
      // alert('输入的身份证号里出生日期不对！');
      return false
    } else {
      // 检验18位身份证的校验码是否正确。
      // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
      var valnum
      arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      nTemp = 0
      for (i = 0; i < 17; i++) {
        nTemp += num.substr(i, 1) * arrInt[i]
      }
      valnum = arrCh[nTemp % 11]
      if (valnum !== num.substr(17, 1)) {
        // alert('18位身份证的校验码不正确！应该为：' + valnum);
        return false
      }
      return true
    }
  }
  return false
}
export function checkIdentify(type, identityCard) {
  type = type * 1
  if (type === 0) {
    return checkID(identityCard)
  } else if (type === 1) {
    var re = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/
    return re.test(identityCard)
  } else if (type === 2) {
    var rel1 = /^[0-9]{8}$/
    var rel2 = /^[0-9]{10}$/
    return rel1.test(identityCard) || rel2.test(identityCard)
  } else if (type === 3) {
    var re1 = /^[a-zA-Z]{5,17}$/
    var re2 = /^[a-zA-Z0-9]{5,17}$/
    return (re2.test(identityCard)) || re1.test(identityCard)
  } else {
    return false
  }
}
/**
 * 身份证获取年龄
 * @param {String} value
 */
export function GetAge(identityCard) {
  var len = (identityCard + '').length
  if (len === 0) {
    return 0
  } else {
    if ((len !== 15) && (len !== 18)) {
      return 0
    }
  }
  var strBirthday = ''
  if (len === 18) {
    strBirthday = identityCard.substr(6, 4) + '/' + identityCard.substr(10, 2) + '/' + identityCard.substr(12, 2)
  }
  if (len === 15) {
    strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2)
  }
  // 时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday)
  var nowDateTime = new Date()
  var age = nowDateTime.getFullYear() - birthDate.getFullYear()
  // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
/**
 * 验证座机号
 * @param {*} value
 */
export function isFixedTelephone(value) {
  if (/^((\d{3,4}\-))\d{7,8}$/.test(value)) {
    return true
  } else {
    return false
  }
}
/**
 * 匹配URL
 * @param {*} value
 */
export function isURL(value) {
  if ((/[http]+:\/\/[^\s]*/.test(value)) || (/[https]+:\/\/[^\s]*/.test(value))) {
    return true
  } else {
    return false
  }
}
/**
 * 判断是IOS终端
 * @returns {Boolean}
 */
export function isIOS() {
  const ua = navigator.userAgent
  // Ios终端
  const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    return true
  } else {
    return false
  }
}
// export function number() {
//   if ((/^\d*$/)) {
//     return true
//   } else {
//     return false
//   }
// }
