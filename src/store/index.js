import Vue from 'vue'
import Vuex from 'vuex'
import snackbar from "@store/modules/snackbar"
import cancelRequest from "@store/modules/cancelRequest"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    snackbar,
    cancelRequest
  }
})
