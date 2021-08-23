const localStorage = window.localStorage

/**
 * localStorage 设置
 * @param {String} key 键
 * @param {String} val 值
 * @returns {Any}
 */
function set (key, val) {
  if (!key) return void 0
  return localStorage.setItem(key, val)
}

/**
 * 获取 localStorage
 * @param {String} key 
 * @returns {Any}
 */
function get (key) {
  if (!key) return void 0
  return localStorage.getItem(key)
}

/**
 * 清除 localStorage，若不填参数 key，则清除所有 localStorage
 * @param {String} key 
 * @returns {Boolean} 是否清除成功
 */
function remove (key) {
  if (typeof key === 'undefined') return localStorage.clear()
  return localStorage.removeItem(key)
}

export default {
  set,
  get,
  remove
}