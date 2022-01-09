/**
 * 复制单行内容到粘贴板
 * @param {String} content
 */
function copyToClip (content) {
  // 由于execCommand面临被废弃的问题，使用navigator.clipboard替代它
  if (navigator.clipboard) {
    navigator.clipboard.writeText(content)
  } else {
    const aux = document.createElement('input')
    aux.setAttribute('value', content)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
  }
}

/**
 * 防抖函数
 * 多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行
 * 对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时
 * @param {Function} func
 * @param {Number} delay
 * @returns {Function}
 */
function debounce (func, delay) {
  let timer = null
  return function (...params) {
    let self = this
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(self, params)
    }, delay)
  }
}

/**
 * 节流函数
 * 触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用
 * 对处理函数进行延时操作，通过设定时间片，控制事件函数间断性的触发
 * @param {Function} func
 * @param {Number} delay
 * @returns {Function}
 */
function throttle (func, delay) {
  let start = 0
  return (...params) => {
    let now = new Date().getTime()
    let self = this
    if (now > start + delay) {
      func.apply(self, params)
      start = now
    }
  }
}

/**
 * 将字符串中的特殊字符转义，用于正则表达式中
 * @param {String} str 需要转义的字符串
 * @returns {String}
 */
function escapeRegExp (str) {
  const regexp = /[\\^$.*+?()[\]{}|]/g
  return str && new RegExp(regexp.source).test(str) ? str.replace(regexp, '\\$&') : str
}

/**
 * 深拷贝
 * 此方法慎用，当对象中包含值为undefined或函数表达式时会自动忽略，还有很多值会转换错误
 * @param {Object|Array} target
 * @returns {Object|Array}
 */
function deepCopy (target) {
  return JSON.parse(JSON.stringify(target))
}

/**
 * 判断当前操作系统是否为mac或ios
 * @returns {Boolean}
 */
function isMac () {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

/**
 * 生成随机的CSRF_Token，长为36位，中间随机四个位置放置分隔符-
 * @param {Number} len 
 * @param {Number} divideNum 
 * @returns {String}
 */
function randomCSRFToken (len = 36, divideNum = 4) {
  const arr = []
  const divideCharPosList = []
  const availableChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  for (let i = 0;i < divideNum;i++) {
    let num
    do {
      num = randomNum(len - 1, 0)
    } while (divideCharPosList.includes(num))
    divideCharPosList.push(num)
  }
  for (let i = 0;i < len;i++) {
    if (divideCharPosList.includes(i)) {
      arr[i] = '-'
    } else {
      arr[i] = availableChars.substr(Math.floor(Math.random() * availableChars.length), 1)
    }
  }
  return arr.join('')
}

/**
 * 生成一定范围内的随机数
 * @param {Number} to 最大值
 * @param {Number} from 最小值
 * @returns {Number}
 */
function randomNum (to, from = 0) {
  return Math.floor(Math.random() * (to - from + 1) + from)
}

/**
 * 判断当前是否为生产环境
 * @returns {Boolean}
 */
function isProd () {
  return ['production', 'prod'].includes(process.env.NODE_ENV)
}

export {
  copyToClip,
  debounce,
  throttle,
  escapeRegExp,
  isMac,
  deepCopy,
  randomCSRFToken,
  isProd,
  randomNum
}