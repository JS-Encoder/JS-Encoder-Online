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
  }
}

export default instance