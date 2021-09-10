const user = {
  setLoginState: (state, isLogin) => {
    state.loginState = isLogin
  },
  setLoginInfo: (state, info) => {
    state.loginInfo = Object.assign({}, state.loginInfo, info)
  },
  setLoginInfoItem: (state, info) => {
    state.loginInfo[info.key] = info.val
  },
  setCurUserDetail: (state, detail) => {
    state.curUserDetail = Object.assign({}, state.curUserDetail, detail)
  },
  setUserBindInfo: (state, bindInfo) => {
    state.curUserDetail[bindInfo.key] = bindInfo.val
  },
  clearCurUserDetail: (state) => {
    const detail = state.curUserDetail
    for (let key in detail) {
      detail[key] = ''
    }
    state.curUserDetail = Object.assign({}, detail)
  }
}

export default user