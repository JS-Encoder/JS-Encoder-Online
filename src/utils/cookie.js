/**
 * 存储cookie
 * @param {String} name
 * @param {Any} value
 * @param {Number} time 秒
 * @param {Object} opts
  * @param {Boolean} secure 是否只应通过被HTTPS发送
  * @param {Boolean} sameSite 是否需要权限验证，如果需要，该cookie在请求第三方网站的时候不会发送
  * @param {Boolean} httpOnly 是否可以通过javascript代码获取cookie
  * @param {String} path 
  * 
 */
function set (name, value, time, { secure = false, sameSite = 'None', httpOnly = false, path = '/' }) {
  name = escape(name)
  value = escape(value)
  let newCookie = ''
  if (time === Infinity) {
    newCookie = `${name}=${value};path=${path};`
  } else {
    const expires = new Date()
    expires.setTime(expires.getTime() + time * 1000)
    newCookie = `${name}=${value};expires=${expires.toUTCString()};path=${path};`
  }
  if (secure) newCookie += 'Secure=true;'
  if (httpOnly) newCookie += 'HttpOnly=true;'
  if (sameSite !== 'None') newCookie += `SameSite=${sameSite};`
  document.cookie = newCookie
}
/**
 * 获取cookie中的id，用于自动登陆
 * @param {String} name
 * @returns {String}
 */
function get (name) {
  name = escape(name)
  let allCookies = document.cookie
  name += '='
  const pos = allCookies.indexOf(name)
  //如果找到了具有该名字的cookie，那么提取并使用它的值
  if (pos > -1) {
    const start = pos + name.length
    let end = allCookies.indexOf(";", start)
    if (end === -1) end = allCookies.length
    const value = allCookies.substring(start, end)
    return unescape(value)
  } else {
    return void 0
  }
}
/**
 * 删除cookie
 * @param {String} name 
 * @param {String} path 
 */
function del (name, path = '/') {
  name = escape(name)
  const expires = new Date(0)
  document.cookie = `${name}= ;expires=${expires.toUTCString()};path=${path}`
}

export default {
  set,
  get,
  del
}