/**
 * 封装axios请求方法
 */

import axios from 'axios'
import qs from 'qs'
import store from '@store'
import cookie from '@utils/cookie'
import message from '@plugins/message'
import router from '../router'

axios.defaults.timeout = 60 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.put['Content-Type'] = 'multipart/form-data;charset=UTF-8'
axios.defaults.headers.delete['Content-Type'] = 'multipart/form-data;charset=UTF-8'

axios.interceptors.request.use(async config => {
  // config.cancelToken = new axios.CancelToken(cancel => {
  //   store.commit('cancelRequest/pushToken', { cancelToken: cancel })
  // })
  const loginState = store.state.loginState
  if (loginState) {
    const token = cookie.get('AUTH_TOKEN')
    if (token) {
      config.headers.token = token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        /**
         * 401: 未登录, 未登录则跳转登录页面，并携带当前页面的路径
         * 在登录成功后返回当前页面，这一步需要在登录页操作
         */
        case 401:
          message.info('请登录后再进行相关操作！')
          router.replace({
            name: 'Login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        // 404请求不存在
        case 404:
          break
        default:
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise}
 */
export function get (url, params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params,
      ...config
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      if (err.config.url === '/cdnJS') {
        message.error('请求cdnJS失败')
      } else {
        message.error('啊哦~服务器出了点问题😭！')
      }
      reject(err)
    })
  })
}

/** 
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 * @returns {Promise}
 */
export function post (url, params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params), config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        message.error('啊哦~服务器出了点问题😭！')
        reject(err)
      })
  })
}

export function put (url, params, config = {}) {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    for (let key in params) {
      formData.append(key, params[key])
    }
    axios.put(url, formData, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        message.error('啊哦~服务器出了点问题😭！')
        reject(err)
      })
  })
}

export function del (url, params, config = {}) {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    for (let key in params) {
      formData.append(key, params[key])
    }
    axios.delete(`${url}?${qs.stringify(params)}`, config)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        message.error('啊哦~服务器出了点问题😭！')
        reject(err)
      })
  })
}