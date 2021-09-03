import { get, post } from './request'

const api = {
  /* 获取仓库版本列表 */
  repoRelease: () => get('/githubApi/repos/Longgererer/JS-Encoder/releases'),
  /* 获取仓库最高版本 */
  repoLatestV: () => get('/githubApi/repos/Longgererer/JS-Encoder/releases/latest'),
  /* 用户名是否唯一 */
  usernameUnique: () => get(),
  /* 邮箱是否唯一 */
  emailUnique: () => get(),
  /* 邮箱验证码 */
  emailAuthCode: () => get(),
  /* 注册 */
  signUp: () => { },
  /* 登录 */
  login: () => { },
  /* 向邮箱发送重置密码验证链接 */
  emailAuthLink: () => { },
  /* 重置密码 */
  resetPwd: () => { },
  /* 发送反馈 */
  sendFeedback: () => { },
  /* 查询实例列表 */
  searchInstanceList: () => { },
  /* cdn 列表 */
  searchCDNList: (params) => get('/cdnJS', params)
}

export default api