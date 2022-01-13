const localStorage = window.localStorage

/**
 * localStorage 设置
 * @param {String} key 键
 * @param {String} val 值
 * @returns {Any}
 */
function set (key, val) {
  if (!key) return void 0
  return localStorage.setItem(key, JSON.stringify(val))
}

/**
 * 获取 localStorage
 * @param {String} key 
 * @returns {Any}
 */
function get (key) {
  if (!key) return void 0
  let result = localStorage.getItem(key)
  try {
    result = JSON.parse(result)
  } catch(err) {
    console.log(err)
  }
  return result
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