import store from '@/store'

const msgTList = ['info', 'success', 'error', 'warning', 'primary']
const message = {}

msgTList.forEach(item => {
  message[item] = (opts) => {
    if (typeof opts === 'string') {
      opts = { msg: opts }
    }
    store.commit('alertMsg/message', Object.assign({
      type: item,
      dark: true,
      timeout: 3000,
    }, opts))
  }
})

export default message