import Vue from 'vue'
import Alert from '@components/alert'
import Vuetify from 'vuetify/lib'
import { getType } from '@utils/type'

const vms = {
  create (comp, opts) {
    let vm = new comp()
    vm.$vuetify = new Vuetify().framework
    vm = vm.$mount()
    if (opts)
      for (let o in opts) {
        vm[o] = opts[o]
      }
    document.body.appendChild(vm.$el)
    return vm
  }
}

const MyAlert = Vue.extend(Alert)

Object.assign(Vue.prototype, {
  $alert (opts) {
    if (getType(opts) === 'string' || getType(opts) === 'number' || getType(opts) === 'array') {
      opts = { content: opts }
    }
    const vm = vms.create(MyAlert)
    let promise = new Promise((resolve) => {
      vm.$on('ok', () => {
        resolve(true)
      })
      vm.$on('cancel', () => {
        resolve(false)
      })
    })
    Object.assign(vm, opts)
    vm.visible = true
    return promise
  }
})