/**
 * 封装axios请求方法
 */

import axios from 'axios'
import qs from 'qs'
import store from '@store/index.js'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use(async config => {
  config.cancelToken = new axios.CancelToken(cancel => {
    store.commit('cancelRequest/pushToken', { cancelToken: cancel })
  })
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
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        /**
         * 403 token过期
         * 登录过期对用户进行提示
         * 清除本地token和清空vuex中token对象
         * 跳转登录页面
         */
        case 403:
          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
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
      reject(err.data)
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
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}