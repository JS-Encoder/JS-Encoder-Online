import { get, post, put, deleteReq } from './request'

const api = {
  /* 获取仓库版本列表 */
  repoRelease: () => get('/githubApi/repos/Longgererer/JS-Encoder/releases'),
  /* 获取仓库最高版本 */
  repoLatestV: () => get('/githubApi/repos/Longgererer/JS-Encoder/releases/latest'),
  /* 用户名是否唯一 */
  usernameUnique: (params) => get('/api/index/isDuplicate', params),
  /* 注册 */
  signUp: (params) => post('/api/index/register', params),
  /* 验证邮箱唯一并向邮箱发送验证码 */
  emailAuthCode: (params) => get('/api/index/send', params),
  /* 自动登录验证 */
  verifyLogin: () => get('/api/index/verify'),
  /* 登录或绑定第三方账户登录 */
  login: (params, config) => post('/api/index/login', params, config),
  /* 第三方登录码云 */
  loginGitee: (params) => get('/api/index/gitee', params),
  /* 直接第三方登录 */
  oauthLogin: (params, config) => post('/api/index/doLogin', params, config),
  /* 退出登录 */
  logout: () => get('/api/index/logout'),
  /* 邮箱发送重置密码验证链接 */
  emailAuthLink: () => { },
  /* 重置密码 */
  resetPwd: () => { },
  /* 解绑gitee */
  unbindGitee: (params) => put('/api/user/unbindGitee', params),
  /* 解绑github */
  unbindGithub: (params) => put('/api/user/unbindGithub', params),
  /* 获取用户详细信息 */
  getUserInfo: (params) => get('/api/query/queryByUsername', params),
  /* 更新用户信息 */
  updateUserInfo: (params) => put('/api/user/', params),
  /* 获取七牛云图片上传token */
  getQiNiuToken: () => get('/api/index/getToken'),
  /* 发送反馈 */
  sendFeedback: () => { },
  /* 查询实例列表 */
  searchInstanceList: () => { },
  /* cdn 列表 */
  searchCDNList: (params) => get('/cdnJS', params),
}

export default api