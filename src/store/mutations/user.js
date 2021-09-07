const user = {
  setLoginState: (state, isLogin) => {
    state.loginState = isLogin
  },
  setLoginInfo: (state, info) => {
    state.loginInfo = info
  },
  setLoginInfoItem: (state, bindInfo) => {
    state.loginInfo[bindInfo.key] = bindInfo.val
  },
  setCurUserDetail: (state, detail) => {
    state.curUserDetail = detail
  },
  clearCurUserDetail: (state) => {
    state.curUserDetail = {
      avatar: '',
      username: '',
      nickname: '',
      about: '',
      email: ''
    }
  }
}

export default user