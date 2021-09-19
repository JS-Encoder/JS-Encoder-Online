import store from '@store'

// 处理实例iframe的代码执行
class IframeHandler {
  constructor(iframe) {
    if (!IframeHandler.instance) {
      this.iframe = iframe
      IframeHandler.instance = this
    }
    return IframeHandler.instance
  }

  /**
   * 向iframe中插入代码
   * @param {Object} code 代码集合
   * @param {Object} links 外部链接集合
   * @param {Boolean} isMD 是否为markdown模式
   * @param {String} headTags 需要添加在头部的标签字符串
   */
  async insertCode (code, links, isMD, headTags = '') {
    const { HTMLCode, CSSCode, JSCode } = code
    const { cssLinks, JSLinks } = links
    const iDoc = this.iframe.contentWindow.document
    let extCss = '',
      extJS = ''
    for (let i = 0, k = cssLinks.length;i < k;i++) {
      const linkStr = `<link href="${cssLinks[i]}" rel="stylesheet">\n`
      extCss += linkStr
    }
    for (let i = 0, k = JSLinks.length;i < k;i++) {
      const linkStr = `<script src="${JSLinks[i]}"></script>\n`
      extJS += linkStr
    }
    let head = `
    ${headTags}
    ${extCss}
    ${extJS}
    <style>
    ${CSSCode}
    </style>
    `.trim()
    const compiledCode = this.jointHTML(head, HTMLCode)
    iDoc.open()
    iDoc.write(compiledCode)
    iDoc.close()
    return new Promise((resolve) => {
      this.iframe.onload = () => {
        if (isMD) {
          this.renderMathFormula()
          this.renderFlowchart()
        }
        resolve(() => {
          // 为了让截图中的文字不产生变化，在编译后的代码中加上默认文字样式
          head = `
          <style>body{font-family:"Microsoft YaHei";}</style>
          ${head}
          `.trim()
          store.commit('setCompiledCode', this.jointHTML(head, HTMLCode))
          this.insertScript(JSCode)
        })
      }
    })
  }

  /**
   * 向iframe中插入script标签
   * @param {String} JSCode
   */
  insertScript (JSCode) {
    const doc = this.iframe.contentWindow.document
    const script = doc.createElement('script')
    script.text = JSCode
    doc.body.appendChild(script)
  }

  // 渲染markdown中的数学公式
  async renderMathFormula () {
    const iBody = this.iframe.contentWindow.document.body
    let KaTeX
    if (!loader.get('KaTeX')) {
      // 导入renderMathInElement方法
      KaTeX = (await import('katex/dist/contrib/auto-render')).default
      loader.set('KaTeX', KaTeX)
    } else {
      KaTeX = loader.get('KaTeX')
    }
    KaTeX(iBody, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true },
      ],
    })
  }

  // 渲染markdown中的流程图
  renderFlowchart () {
    const iframeWindow = this.iframe.contentWindow
    const flows = iframeWindow.document.querySelectorAll('.language-flow')
    for (let i = 0, k = flows.length;i < k;i++) {
      const currentFlow = flows[i]
      const pre = currentFlow.parentNode
      const chartBox = document.createElement('div')
      chartBox.id = `flow${i}`
      pre.parentNode.replaceChild(chartBox, pre)
      const code = currentFlow.value || currentFlow.textContent
      iframeWindow.flowchart.parse(code).drawSVG(`flow${i}`)
    }
  }

  // 拼接html代码
  jointHTML (head, body) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    ${head}
    </head>
    <body>
    ${body}
    </body>
    </html>
    `.trim()
  }

  static clearIframe () {
    IframeHandler.instance = null
  }
}
export default IframeHandler
