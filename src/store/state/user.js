const user = {
  loginState: false,
  loginInfo: {
    username: '',
    nickname: '',
    avatar: '',
  },
  /* 当前显示的用户的详细信息 */
  curUserDetail: {
    username: '',
    avatar: '',
    nickname: '',
    about: '',
    contactEmail: '',// 该邮箱不是注册邮箱
    giteeId: '',
    githubId: '',
    email: ''
  }
  /* 进入其他用户主页显示的详细信息 */
}

export default user