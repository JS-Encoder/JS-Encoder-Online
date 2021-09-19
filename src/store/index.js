import Vue from 'vue'
import Vuex from 'vuex'
import alertMsg from "@store/modules/alertMsg"
import cancelRequest from "@store/modules/cancelRequest"
import instanceMutations from './mutations/instance'
import userMutations from './mutations/user'
import instanceStates from './state/instance'
import userStates from './state/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...instanceStates,
    ...userStates,
    visibleDialogName: '', // 全局显示的 dialog name
    hasNewFeatures: false // 是否提示用户有新的特性
  },
  mutations: {
    ...instanceMutations,
    ...userMutations,
    setVisibleDialogName (state, newName) {
      state.visibleDialogName = newName
    },
    setHasNewFeatures (state, has) {
      state.hasNewFeatures = has
    }
  },
  actions: {
  },
  modules: {
    alertMsg,
    cancelRequest
  },
  getters: {
    instanceContent: (state) => {
      const { instanceCode, instanceExtLinks, compiledCode, prep } = state
      const headTags = state.instanceSetting.headTags
      return { instanceCode, instanceExtLinks, compiledCode, headTags, prep }
    },
    isSelfProfile (state) {
      // 判断当前访问的是否为自己的主页
      const { loginState, loginInfo: { username }, curUserDetail: { username: curUsername } } = state
      return loginState && username === curUsername
    },
    isSelfInstance (state) {
      const { loginState, loginInfo: { username }, curInstanceDetail: { username: curUsername } } = state
      return loginState && username === curUsername
    }
  }
})
