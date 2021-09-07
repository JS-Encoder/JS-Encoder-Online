const user = {
  loginState: false,
  loginInfo: {
    username: '',
    nickname: '',
    avatar: '',
    giteeId: null,
    githubId: null
  },
  /* 当前显示的用户的详细信息 */
  curUserDetail: {
    avatar: '',
    nickname: '',
    about: '',
    email: '' // 该邮箱不是注册邮箱
  }
  /* 进入其他用户主页显示的详细信息 */
}

export default user