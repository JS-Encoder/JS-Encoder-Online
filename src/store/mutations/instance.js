const instance = {
  setConsoleH: (state, height) => {
    state.consoleH = height
  },
  setIframeH: (state, height) => {
    state.iframeH = height
  },
  setEditorW: (state, width) => {
    state.editorW = width
  },
  setIframeW: (state, width) => {
    state.iframeW = width
  },
  setPrep: (state, obj) => {
    const { index, newPrep } = obj
    state.prep.splice(index, 1, newPrep)
  },
  setAllPrep: (state, newPrep) => {
    state.prep = newPrep
  },
  setCurTab: (state, tab) => {
    state.curTab = tab
  },
  setMdToolbarVisible: (state, visible) => {
    state.mdToolbarVisible = visible
  },
  setInstanceCode: (state, content) => {
    state.instanceCode[content.mode] = content.code
  },
  setInstancesCode: (state, codeObj) => {
    state.instanceCode = Object.assign({}, codeObj)
  },
  setInstanceSetting: (state, attr) => {
    state.instanceSetting[attr.name] = attr.value
  },
  setAllInstanceSetting: (state, obj) => {
    state.instanceSetting = obj
  },
  setInstanceExtLinks: (state, attr) => {
    state.instanceExtLinks[attr.name] = attr.list
  },
  setAllInstanceExtLinks: (state, obj) => {
    state.instanceExtLinks = obj
  },
  setIframeSVisible: (state, visible) => {
    state.iframeSVisible = visible
  },
  setIframeHVisible: (state, visible) => {
    state.iframeHVisible = visible
  },
  setIframeWVisible: (state, visible) => {
    state.iframeWVisible = visible
  },
  setResolveHTML: (state, status) => {
    state.resolveHTML = status
  },
  setConsoleSettings: (state, setting) => {
    state.consoleSettings = setting
  },
  setConsoleInfo: (state, logs) => {
    state.consoleInfo = logs
  },
  setConsoleInfoCount: (state, count) => {
    state.consoleInfoCount = count
  },
  setCompiledCode: (state, code) => {
    state.compiledCode = code
  },
  setCurInstanceDetail: (state, detail) => {
    state.curInstanceDetail = Object.assign({}, state.curInstanceDetail, detail)
  },
  setIframeInit: (state, isInit) => {
    state.iframeInit = isInit
  },
  resetInstanceState: (state) => {
    // 重置部分instance属性至初始状态
    state.instanceCode = {
      HTML: '',
      CSS: '',
      JavaScript: '',
    }
    state.instanceSetting = {
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
    }
    state.curInstanceDetail = {
      username: '',
      nickname: '',
      title: '',
      tags: '',
      liked: false,
      id: '',
      saved: true
    },
      state.compiledCode = ''
    state.consoleH = 150
    state.consoleInfo = []
    state.consoleInfoCount = { error: 0, warn: 0, info: 0 }
  }
}

export default instance