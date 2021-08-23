/**
 * 存放并取消请求队列
 */

const cancelRequest = {
  namespaced: true,
  state: {
    cancelTokenArr: [] // 取消请求token数组
  },
  mutations: {
    pushToken (state, payload) {
      state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken (state) {
      state.cancelTokenArr = []
    }
  }
}

export default cancelRequest