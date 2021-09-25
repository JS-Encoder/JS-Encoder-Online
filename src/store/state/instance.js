const instance = {
  curTab: 'HTML',
  mdToolbarVisible: false,
  resolveHTML: true,
  prep: ['HTML', 'CSS', 'JavaScript'],
  editorW: 0,
  /* instance */
  instanceCode: {
    HTML: '',
    CSS: '',
    JavaScript: '',
  },
  instanceSetting: {
    delayTime: 500,
    autoExecute: true,
    autoComplete: true,
    lint: true,
    lineWrap: true,
    indent: {
      replace: false,
      width: 2,
    },
    font: {
      family: 'Consolas',
      size: 14,
    },
    headTags: ''
  },
  instanceExtLinks: {
    cssLinks: [],
    JSLinks: [],
  },
  compiledCode: '',
  /* iframe */
  iframeH: 0,
  iframeW: 0,
  iframeHVisible: false,
  iframeWVisible: false,
  iframeSVisible: false,
  /* console */
  consoleH: 150,
  consoleSettings: {
    clear: true,
    highlight: true,
  },
  consoleInfo: [],
  consoleInfoCount: {
    error: 0,
    warn: 0,
    info: 0
  },

  /* 当前实例详情 */
  curInstanceDetail: {
    username: '',
    nickname: '',
    title: '',
    tags: '',
    liked: false,
    id: '',
    saved: true, // 当前实例是否被保存了
    ispublic: true,
  },

  iframeInit: false, // iframe是否被初始化过

  hasUploadCode: false // 当前是否有代码上传
}

export default instance