/**
 * 通过vuex管理snackbar信息
 */

const alertMsg = {
  namespaced: true,
  state: {
    id: 0,
    alertPool: [],
  },
  mutations: {
    message (state, opts) {
      state.alertPool.push({
        ...opts,
        id: state.id++
      })
      setTimeout(() => {
        state.alertPool.shift()
      }, opts.timeout)
    }
  }
}

export default alertMsg