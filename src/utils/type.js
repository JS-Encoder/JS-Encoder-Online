/**
 * 判断数据的具体类型
 * @param {Any} data
 * @returns {String}
 */
function getType (data) {
  if (data === null) return 'null'
  const type = typeof data
  if (type === 'object') return getObjType(data)
  return type
}

/**
 * 判断对象的详细类型
 * @param {Object} data
 * @returns {String}
 */
function getObjType (data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

/**
 * 判断数组的所有元素是不是都是基本类型
 * @param {Array} arr
 * @returns {Boolean}
 */
function judgeBaseArray (arr) {
  let isBase = true
  arr.forEach((item) => {
    const type = getType(item)
    switch (type) {
      case 'number':
      case 'symbol':
      case null:
      case 'boolean':
      case 'undefined':
      case 'string':
        break
      default:
        isBase = false
    }
  })
  return isBase
}

/**
 * 判断对象是否为window
 * @param {Object} obj
 * @returns {Boolean}
 */
 function judgeWindow (obj) {
  const type = getType(obj)
  return type === 'global' || type === 'Window' || type === 'DOMWindow'
}

/**
 * Convert dom to string
 * 将dom转化为字符串
 * @param {Element} dom
 * @returns {String}
 */
 function stringifyDOM (dom) {
  let objE = document.createElement('div')
  objE.appendChild(dom.cloneNode(true))
  const domStr = objE.innerHTML
  objE = dom = null
  return domStr
}

/**
 * Convert the object into a string (topmost key-value pair)
 * 将对象转化成字符串（最顶层的键值对）
 * @param {Object} strObj
 * @returns {String}
 */
 function JSONStringify (strObj) {
  const type = getType(strObj)
  if (type !== 'Object' && type !== 'Array' && type !== 'Map') {
    return JSON.stringify(strObj)
  }
  let prefix = '{',
    suffix = '}'
  if (type === 'Array') {
    prefix = '['
    suffix = ']'
  }
  let str = prefix
  const keys = getObjAllKeys(strObj)
  for (let i = 0;i < keys.length;i++) {
    const key = keys[i]
    let value = strObj[key]
    if (type === 'Map') value = strObj.get(key)
    try {
      // key
      if (type !== 'Array') {
        const keyType = getType(key)
        switch (keyType) {
          case 'Object':
          case 'Array':
          case 'symbol':
            str += Object.prototype.toString.call(key)
            break
          default:
            str += key
        }
        str += ': '
      }
      // value
      let valueType = getType(value)
      if (/^HTML/.test(valueType)) valueType = 'dom'
      switch (valueType) {
        case 'Array':
          str += JSONStringify(value)
          break
        case 'Object':
          str += JSONStringify(value)
          break
        case 'function':
          str += String(value)
          break
        case 'symbol':
          str += String(value)
          break
        case 'dom':
          str += stringifyDOM(value)
          break
        default:
          str += JSON.stringify(value)
      }
      if (i < keys.length - 1) str += ', '
    } catch (e) {
      continue
    }
  }
  str += suffix
  return str
}

/**
 * Get all the keys of the object, including non-enumerable keys
 * 获取对象的所有键，包括不可枚举的键
 * @param {Object} obj
 * @returns {Array}
 */
 function getObjAllKeys (obj) {
  const type = getType(obj)
  if (type === 'Map') {
    const arr = []
    for (let key of obj) {
      const keyType = getType(key[0])
      if (keyType !== 'Object' && keyType !== 'Array') {
        arr.push(key[0])
      } else {
        arr.push(key[0])
      }
    }
    return arr
  } else if (type !== 'Object' && type !== 'Array') return []
  if (type === 'Array') {
    const arr = []
    obj.forEach((_, index) => {
      arr.push(index)
    })
    return arr
  }
  return Object.getOwnPropertyNames(obj).sort()
}

export {
  getType,
  getObjType,
  judgeBaseArray,
  judgeWindow,
  stringifyDOM,
  JSONStringify,
  getObjAllKeys
}