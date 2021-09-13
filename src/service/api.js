import { get, post, put, del } from './request'

const api = {
  /* 获取仓库版本列表 */
  repoRelease: () => get('/githubApi/repos/Longgererer/JS-Encoder/releases'),
  /* 获取仓库最高版本 */
  repoLatestV: () => get('/githubApi/repos/Longgererer/JS-Encoder/releases/latest'),
  /* cdn 列表 */
  searchCDNList: (params) => get('/cdnJS', params),

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
  loginGitee: (params, config) => get('/api/index/gitee', params, config),
  /* 直接第三方登录 */
  oauthLogin: (params, config) => post('/api/index/doLogin', params, config),
  /* 退出登录 */
  logout: () => get('/api/index/logout'),
  /* 邮箱发送重置密码验证链接 */
  emailAuthLink: (params) => post('/api/index/sendPasswordEmail', params),
  /* 重置密码 */
  resetPwd: (params, config) => put('/api/index/modifyPossword', params, config),
  //!/* 删除用户 */
  delUser: (params) => del('/api/user/', params),

  /* 解绑gitee */
  unbindGitee: (params) => put('/api/user/unbindGitee', params),
  /* 解绑github */
  unbindGithub: (params) => put('/api/user/unbindGithub', params),
  /* 更新注册邮箱 */
  modifyBindEmail: (params) => put('/api/user/updateEmail', params),
  /* 获取用户详细信息 */
  getUserInfo: (params) => get('/api/query/queryByUsername', params),
  /* 更新用户信息 */
  updateUserInfo: (params) => put('/api/user/', params),
  /* 获取七牛云图片上传token */
  getQiNiuToken: () => get('/api/index/getToken'),

  /* 获取反馈列表 */
  getFeedbacks: () => get('/api/feedback/getAllFeedback'),
  /* 发送反馈 */
  sendFeedback: (params) => post('/api/feedback/addFeedback', params),

  //!/* 根据实例名或者标签查询实例 */
  searchWorksByContent: (params) => get('/api/query/queryExample', params),

  //!/* 查询实例列表 */
  searchWorks: (params) => get('/api/query/getExample', params),
  //!/* 查看喜爱实例列表 */
  searchLiked: (params) => get('/api/query/getFavorites', params),
  //!/* 查询粉丝列表 */
  searchFollowers: (params) => get('/api/search/getFan', params),
  //!/* 查询关注列表 */
  searchFollowings: (params) => get('/api/search/getFollow', params),
  //!/* 查询回收站列表 */
  searchCycleBin: (params) => { },

  //!/* 添加关注 */
  addFollow: (params) => put('/api/user/addFollow', params),
  //!/* 取消关注 */
  delFollow: (params) => put('/api/user/cancelFollow', params),

  //!/* 添加喜爱实例 */
  addLikeWork: (params) => post('/api/example/addFavorites', params),
  //!/* 取消喜爱实例 */
  delLikeWork: (params) => post('/api/example/cancelFavorites', params),
  /* 创建或保存实例 */
  saveWork: (params) => post('/api/example/createExample', params),
  /* 获取实例详情 */
  getWork: (params) => get('/api/content/getContent', params),
  //!/* 删除实例 */
  delWork: (params) => del('/api/example/', params),
  /* 更新实例设置 */
  configWork: (params) => put('/api/example/', params),
  //!/* 永久删除实例 */
  permanentDelWork: (params) => del('/api/example/delete', params),
  //!/* 恢复实例 */
  resumeDelWork: (params) => post('/api/example/resume', params),
}

export default api