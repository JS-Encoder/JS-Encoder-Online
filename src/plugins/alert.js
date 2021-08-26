import Vue from 'vue'
import Alert from '@components/alert'

const AlertConstructor = Vue.extend(Alert)

const install = () => {
  Object.defineProperty(Vue.prototype, '$alert', {
    get () {
      let id = `jseAlert`
      return (options) => {
        const instance = new AlertConstructor({
          propsData: options
        })
        instance.id = id
        instance.vm = instance.$mount()
        document.body.appendChild(instance.vm.$el)
        return instance.vm
      }
    }
  })
}

export default install