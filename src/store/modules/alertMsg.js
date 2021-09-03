import Vue from 'vue'

/**
 * 通过vuex管理snackbar信息
 */

const alertMsg = {
  namespaced: true,
  state: {
    alertPool: [],
  },
  mutations: {
    message (state, opts) {
      state.alertPool.push(opts)
      setTimeout(() => {
        state.alertPool.shift()
      }, opts.timeout)
    }
  }
}

export default alertMsg