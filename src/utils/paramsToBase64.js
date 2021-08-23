import qs from 'qs'

/**
 * 将查询信息转化为base64编码
 * @param {Object} obj 
 * @returns {String}
 */
function encode (obj) {
  let res = ''
  try {
    res = window.btoa(qs.stringify(obj))
  } catch (error) {
    console.log(error)
  }
  return res
}

/**
 * 将base64编码解码并解析成参数对象
 * @param {String} str 
 * @returns {Object}
 */
function decode (str) {
  let res = {}
  try {
    res = qs.parse(window.atob(str))
  } catch (error) {
    console.log(error)
  }
  return res
}

export {
  encode,
  decode
}