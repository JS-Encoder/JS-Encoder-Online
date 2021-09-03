import store from '@/store'

export default {
  info (opts) {
    store.commit('alertMsg/message', Object.assign({
      type: 'info',
      dark: true,
      timeout: 3000,
    }, opts))
  },
  success (opts) {
    store.commit('alertMsg/message', Object.assign({
      type: 'success',
      dark: true,
      timeout: 3000,
    }, opts))
  },
  error (opts) {
    store.commit('alertMsg/message', Object.assign({
      type: 'error',
      dark: true,
      timeout: 3000,
    }, opts))
  },
  warning (opts) {
    store.commit('alertMsg/message', Object.assign({
      type: 'warning',
      dark: true,
      timeout: 3000,
    }, opts))
  },
  primary (opts) {
    store.commit('alertMsg/message', Object.assign({
      type: 'primary',
      dark: true,
      timeout: 3000,
    }, opts))
  }
}