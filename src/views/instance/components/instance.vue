<template>
  <div id="instance">
    <div class="instance-content">
      <instance-header></instance-header>
      <div class="main-body d-flex">
        <sidebar class="flex-sh"></sidebar>
        <div class="d-flex flex-1 area">
          <div class="code-area d-flex flex-clo" :style="{ width: `${editorW}px` }">
            <editor-tab-bar @selectTool="selectTool"></editor-tab-bar>
            <markdown-tools v-if="mdToolbarVisible && curTab === 'Markdown'" :getCodeMirror="getCodeMirror"
              :getIframeBody="getIframeBody"></markdown-tools>
            <editor class="flex-1" v-show="item === curTab" v-for="(item, index) in prep" :key="index" :codeMode="item"
              :index="index" :ref="'editor' + index" @cursorPosChanged="cursorPosChanged"
              :showCodeArea="item === curTab" @runCode="runCode"></editor>
          </div>
          <div class="resize borbox" v-if="resizeVisible" @mousedown="viewResize"></div>
          <div class="view-area d-flex flex-clo" :style="{ width: `${iframeW}px` }">
            <view-tab-bar @fullScreen="changeFullScreenState" @runCode="runCode"></view-tab-bar>
            <div class="iframe-box" :style="{ height: `${iframeH}px` }" :class="iframeFullScreen ? 'full-screen' : ''">
              <div class="iframe-screen no-select" v-show="iframeSVisible"></div>
              <full-screen-bar v-show="iframeFullScreen" :getIframeBody="getIframeBody" @runCode="runCode"
                @exitFullScreen="changeFullScreenState"></full-screen-bar>
              <iframe title="Preview"
                allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
                frameborder="0" id="iframe" name="iframe" ref="iframeBox"
                sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
                scrolling="yes" allowfullscreen="true" :src="`${publicPath}html/instance.html`"></iframe>
              <div class="iframe-width no-select" v-show="showIframeWidth">{{ iframeW }}px</div>
            </div>
            <div class="console-box" :style="{ height: `${consoleH}px` }">
              <console></console>
            </div>
          </div>
        </div>
      </div>
      <instance-footer :isCompiling="isCompiling" :cursorPos="cursorPos"></instance-footer>
    </div>
    <template-dialog></template-dialog>
    <prep-dialog></prep-dialog>
    <library-dialog></library-dialog>
    <settings-dialog></settings-dialog>
    <upload-dialog></upload-dialog>
    <download-dialog></download-dialog>
    <shortcut-dialog></shortcut-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import InstanceHeader from './header.vue'
import Sidebar from './sidebar.vue'
import EditorTabBar from './editorTabBar.vue'
import MarkdownTools from './markdownTools.vue'
import Editor from './editor.vue'
import ViewTabBar from './viewTabBar.vue'
import FullScreenBar from './fullScreenBar.vue'
import Console from './console.vue'
import InstanceFooter from './footer.vue'

/* dialog */
import TemplateDialog from './dialog/template.vue'
import PrepDialog from './dialog/prep.vue'
import LibraryDialog from './dialog/library.vue'
import SettingsDialog from './dialog/settings.vue'
import UploadDialog from './dialog/upload.vue'
import DownloadDialog from './dialog/download.vue'
import ShortcutDialog from './dialog/shortcut.vue'

/* scripts */
import { compileHTML, compileCSS, compileJS } from '@utils/editor/compiler'
import { deepCopy } from '@utils/tools'
import { iframeLinks } from '@utils/cdn'
import ShortcutHandler from '@utils/editor/handleShortcut'
import SyncScroll from '@utils/editor/syncScroll'
import IframeHandler from '@utils/editor/handleInstanceView'
import IframeConsole from '@utils/editor/console'
import handleLoop from '@utils/editor/handleLoop'
import { judgeMode } from '@utils/editor/judgeMode'

export default {
  data() {
    return {
      resizeVisible: true,
      publicPath: process.env.BASE_URL,
      isChildrenMounted: false,
      iframeFullScreen: false,
      consoleInfo: [],
      isCompiling: false,
      cursorPos: { col: 1, ln: 1 },
      showIframeWidth: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isChildrenMounted = true
      // 初始化快捷键
      new ShortcutHandler().install()
      // 一开始就初始化console并执行代码
      new IframeConsole(this.$refs.iframeBox)
      this.runCode().then(() => {
        this.setIframeInit(true)
      })
    })
  },
  computed: {
    ...mapState([
      'prep',
      'mdToolbarVisible',
      'curTab',
      'iframeSVisible',
      'iframeH',
      'consoleH',
      'editorW',
      'iframeW',
      'instanceCode',
      'instanceSetting',
      'instanceExtLinks',
      'consoleSettings',
      'iframeInit',
    ]),
    isMD() {
      return this.prep[0] === 'Markdown'
    },
  },
  watch: {
    consoleInfo(newLogs) {
      this.setConsoleInfo(newLogs)
    },
    isMD(newVal) {
      this.runCode()
      if (!newVal) new SyncScroll().clearSyncScroll()
    },
  },
  methods: {
    ...mapMutations([
      'setIframeW',
      'setIframeSVisible',
      'setIframeWVisible',
      'setEditorW',
      'setConsoleInfo',
      'setConsoleInfoCount',
      'setCurInstanceDetail',
      'setIframeInit',
    ]),
    viewResize(e) {
      // 用鼠标拖动分割线改变编辑器和预览窗口的宽度
      // 拖动时需要在iframe上显示一个遮罩层，否则鼠标滑动到iframe中会影响拖动事件监听
      this.setIframeSVisible(true)
      // 拖动时显示预览窗口宽度
      this.setIframeWVisible(true)
      const starX = e.clientX
      const viewW = this.iframeW
      const editorW = this.editorW
      const wholeW = viewW + editorW
      document.onmousemove = (ev) => {
        const iEvent = ev || event
        const finW = editorW + iEvent.clientX - starX
        if (finW > 100 && wholeW - finW > 100) {
          this.setEditorW(finW)
          this.setIframeW(wholeW - finW)
          this.showIframeWidth = true
        }
        document.onmouseup = () => {
          this.setIframeSVisible(false)
          this.setIframeWVisible(false)
          document.onmouseup = null
          document.onmousemove = null
          this.showIframeWidth = false
          // 在拖动时由于编辑窗口宽度改变，需要刷新codemirror来适应新的宽度
          const index = this.prep.indexOf(this.curTab)
          this.getCodeMirror(index).refresh()
        }
      }
    },
    async runCode(init = false) {
      // 执行代码时，在底部的信息栏展示loading动画
      this.isCompiling = true
      const iframe = this.$refs.iframeBox
      const code = this.instanceCode
      const prep = this.prep
      let links = {}
      const isMD = this.isMD
      let HTMLCode = '',
        CSSCode = '',
        JSCode = ''
      const docConsole = new IframeConsole()
      // 在markdown模式下不需要重新引入iframe，因为改变的只是html而已
      if (!isMD) {
        if (this.iframeInit) {
          // 在非markdown模式下必须重新加载iframe来避免上一次执行的javascript代码影响到新代码的执行结果
          iframe.contentWindow.location.replace(iframe.src)
          // iframe.src += ''
          // 使用reload重载似乎在新版chrome和edge中会加载外部的vueApp，因此使用src代替
          // iframe.contentWindow.location.reload()
          const consoleSettings = this.consoleSettings
          if (consoleSettings.clear) {
            IframeConsole.clear()
            this.setConsoleInfo([])
          }
          await new Promise((resolve) => {
            iframe.onload = () => {
              docConsole.refresh(iframe)
              iframe.onload = null
              resolve()
            }
          })
        }
        await compileCSS(code.CSS, prep[1]).then((res) => {
          CSSCode = res
        })
        await compileJS(code.JavaScript, prep[2]).then((res) => {
          // 将JavaScript源代码通过AST在内部插入可以监听并阻止死循环的代码
          JSCode = handleLoop(res)
        })
        // 因为接下来可能需要动态修改外部链接，因此这里需要深拷贝一下
        links = deepCopy(this.instanceExtLinks)
        // 除了用户添加的自定义脚本链接，还有一些公共的内部脚本需要导入
        links.JSLinks = [...links.JSLinks, ...iframeLinks.commonJS]
      } else {
        // 为markdown加载代码高亮和KaTeX公式转换功能
        links.cssLinks = iframeLinks.mdCSS
        links.JSLinks = iframeLinks.mdJS
      }
      await compileHTML(code.HTML, prep[0]).then((res) => {
        HTMLCode = res
      })
      setTimeout(async () => {
        const handler = new IframeHandler(iframe)
        const headTags = this.instanceSetting.headTags
        const onerror = (msg, _, row, col) => {
          docConsole.consoleInfo.push({
            type: 'system-error',
            content: msg,
            row: row - 1,
            col: col - 4,
          })
          return void 0
        }
        const onunhandledrejection = (e) => {
          docConsole.consoleInfo.push({
            type: 'error',
            content: `Unhandled promise rejection: ${e.reason}`,
          })
        }
        await handler
          .insertCode(
            { HTMLCode, CSSCode, JSCode },
            links,
            isMD,
            headTags,
            onerror,
            onunhandledrejection
          )
          .then((callback) => {
            callback()
          })
        let logs = docConsole.getLogs()
        // 日志超出1000条弹出错误警报
        if (logs.length > 1000) {
          logs = logs.slice(0, 999)
          logs.push({
            type: 'error',
            content:
              'You have over 1000 logs on the Console, rendering too many logs will cause the page to stage. please use your browser Console to view more logs!',
          })
        }
        this.calcConsoleInfoCount(logs)
        this.consoleInfo = logs
        if (isMD) this.initSyncScroll(iframe)
        this.isCompiling = false
        if (init) this.setCurInstanceDetail({ saved: false })
      }, 200)
    },
    initSyncScroll(iframe) {
      // 初始化markdown同步滚动功能
      if (!iframe) iframe = this.$refs.iframeBox
      new SyncScroll(this.getCodeMirror(0), iframe)
    },
    changeFullScreenState(visible) {
      this.iframeFullScreen = visible
    },
    selectTool(toolName){
      if(this.isChildrenMounted){
        switch(toolName){
          case 'format': {
            const mode = judgeMode(this.curTab)
            const tabs = [ 'HTML', 'CSS', 'JavaScript' ]
            const index = tabs.indexOf(mode)
            this.$refs[`editor${index}`][0].format()
          }
        }
      }
    },
    getCodeMirror(index) {
      // 在codemirror组件挂载完毕，获取其内部方法
      return this.isChildrenMounted
        ? this.$refs[`editor${index}`][0].getCodeMirror()
        : void 0
    },
    getIframeBody() {
      return this.$refs.iframeBox
    },
    cursorPosChanged(pos) {
      this.cursorPos = pos
    },
    calcConsoleInfoCount(consoleInfo) {
      const consoleInfoCount = {
        error: 0,
        warn: 0,
        info: 0,
        sum: consoleInfo.length,
      }
      for (let item of consoleInfo) {
        const type = item.type
        switch (item.type) {
          case 'error':
          case 'warn':
          case 'info':
            consoleInfoCount[type]++
            break
          case 'system-error':
            consoleInfoCount.error++
        }
      }
      this.setConsoleInfoCount(consoleInfoCount)
    },
  },
  components: {
    InstanceHeader,
    Sidebar,
    EditorTabBar,
    MarkdownTools,
    Editor,
    ViewTabBar,
    FullScreenBar,
    Console,
    InstanceFooter,
    PrepDialog,
    LibraryDialog,
    SettingsDialog,
    UploadDialog,
    DownloadDialog,
    ShortcutDialog,
    TemplateDialog
  },
}
</script>

<style lang="scss" scoped>
#instance {
  width: 100%;
  height: 100%;
  background-color: $deep-4;
  overflow: hidden;
  .instance-content {
    width: 100%;
    height: 100%;
    .main-body {
      height: calc(100% - 61px);
      .area {
        .resize {
          width: 4px;
          height: 100%;
          border: 2px solid $deep-3;
          cursor: w-resize;
          @include setTransition(all, 0.3s, ease);
          &:hover {
            border-color: $primary-1;
          }
        }
        .view-area {
          .iframe-box {
            background-color: $light-1;
            position: relative;
            overflow: hidden;
            transform-origin: top right;
            .iframe-screen {
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.3);
              position: absolute;
              z-index: 1;
            }
            iframe {
              width: 100%;
              height: 100%;
            }
            .iframe-height,
            .iframe-width {
              position: absolute;
              bottom: 0;
              left: 0;
              color: $light-5;
              background-color: $deep-3;
              border: 1px solid $deep-4;
              z-index: 2;
              font-size: 12px;
              padding: 4px;
            }
          }
          .full-screen {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2000;
            width: 100% !important;
            height: 100% !important;
          }
          .console-box {
            width: 100%;
            height: 150px;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
