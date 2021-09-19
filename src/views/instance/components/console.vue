<template>
  <div id="console">
    <div class="console-tab borbox d-flex flex-ai no-select">
      <div class="title">
        <i class="icon iconfont icon-console"></i>
        <span>Console</span>
      </div>
      <div class="resize d-flex flex-ai" @mousedown="resize">
        <i class="icon iconfont icon-resize"></i>
      </div>
      <div class="options d-flex">
        <div title="过滤器">
          <v-menu top offset-y class="filter-dropdown">
            <template v-slot:activator="{ attrs, on }">
              <v-btn icon v-bind="attrs" v-on="on" height="25" width="25">
                <i class="icon iconfont icon-filter1"></i>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in filterList" :key="index" class="d-flex flex-ai"
                style="font-family:Consolas, Monaco" :class="filter[item]?'active-dropdown-item':''"
                @click.native="filter[item]=!filter[item]">
                <span class="flex-1">{{item}}</span>
                <v-icon v-show="filter[item]">mdi-check</v-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div title="设置" @click="closeSettings">
          <v-btn icon height="25" width="25">
            <i class="icon iconfont icon-config1" :class="settingsVisible?'active-opt':''"></i>
          </v-btn>
        </div>
        <div title="清除日志" @click="clearLogs">
          <v-btn icon height="25" width="25">
            <i class="icon iconfont icon-recycle"></i>
          </v-btn>
        </div>
        <div title="最小化" @click="minimalConsole">
          <v-btn icon height="25" width="25">
            <i class="icon iconfont icon-zuixiaohua"></i>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="console-body d-flex flex-clo">
      <div class="cm-list flex-1 CodeMirror cm-s-default" ref="consoleList" v-show="!settingsVisible">
        <div v-for="(item, index) in consoleInfo" :key="index" class="log-list">
          <div v-if="item.type==='log'|| item.type==='dir'" v-show="filter.Log" class="log d-flex flex-ai">
            <i class="icon iconfont icon-lfmonth"></i>
            <pre v-for="(value, index) in item.logs" :key="index" v-html="value" class="CodeMirror-line"></pre>
          </div>
          <div v-if="item.type==='mix'" class="mix d-flex flex-ai">
            <i class="icon iconfont icon-lfmonth"></i>
            <codemirror :options="codeOptions" @hook:mounted="cmFold(index)" v-show="settings.highlight" v-once
              :value="item.content" class="code-log" :ref="`logArea${index}`">
            </codemirror>
            <div class="code-log" v-show="!settings.highlight" v-once>{{item.content}}</div>
          </div>
          <div v-if="item.type==='info'" v-show="filter.Info" class="info d-flex flex-ai">
            <i class="icon iconfont icon-info"></i>
            <pre class="CodeMirror-line d-flex">
              <span class="content">{{item.content}}</span>
            </pre>
          </div>
          <div v-if="item.type==='system-error'" v-show="filter.Error" class="system-error d-flex flex-ai">
            <i class="icon iconfont icon-error1"></i>
            <pre class="CodeMirror-line d-flex">
              <span class="content">{{item.content}}</span>
              <span class="row">row: {{item.row}}</span>
              <span class="col">col: {{item.col}}</span>
            </pre>
          </div>
          <div v-if="item.type==='error'" v-show="filter.Error" class="error d-flex flex-ai">
            <i class="icon iconfont icon-error1"></i>
            <pre class="CodeMirror-line d-flex">
              <span class="content">{{item.content}}</span>
            </pre>
          </div>
          <div v-if="item.type==='warn'" v-show="filter.Warning" class="warn d-flex flex-ai">
            <i class="icon iconfont icon-warn1"></i>
            <pre class="CodeMirror-line d-flex">
              <span class="content">{{item.content}}</span>
            </pre>
          </div>
          <div v-if="item.type==='print'" class="print d-flex flex-ai">
            <i class="icon iconfont icon-lfmonth"></i>
            <pre class="CodeMirror-line d-flex" v-html="item.logs[0]">
              <span class="content">{{item.content}}</span>
            </pre>
          </div>
          <div v-if="item.type==='mixPrint'" class="mix-print d-flex flex-ai">
            <i class="icon iconfont icon-lfmonth"></i>
            <codemirror :options="codeOptions" @hook:mounted="cmFold(index)" v-show="settings.highlight" v-once
              :value="item.content" class="code-log" :ref="`logArea${index}`">
            </codemirror>
            <div class="code-log" v-show="!settings.highlight" v-once>{{item.content}}</div>
          </div>
        </div>
      </div>
      <div class="settings borbox flex-1 flex-clo" v-show="settingsVisible">
        <v-checkbox dense hide-details v-model="settings.clear" label="自动清除历史日志"></v-checkbox>
        <span class="text-describe text-xs">选中此选项将会在每次执行代码之前清除先前生成的历史日志，你可以选择保留历史日志，但可能会影响性能</span>
        <v-checkbox dense hide-details v-model="settings.highlight" label="代码高亮"></v-checkbox>
        <span class="text-describe text-xs">选中此选项，日志内容将被高亮渲染</span>
      </div>
      <div class="textarea-box borbox d-flex flex-ai flex-sh">
        <i class="icon iconfont icon-lfmonth print-icon"></i>
        <codemirror :options="cmdOptions" :value="consoleMsg" @keydown.native="handleCmd" v-model="consoleMsg"
          class="cmd-codemirror" ref="cmdArea">
        </codemirror>
        <v-btn small class="flex-sh run-btn" :disabled="!consoleMsg" color="primary" @click="exeCmd">Run
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import IframeConsole from '@utils/editor/console'
import { codemirror } from 'vue-codemirror'
export default {
  data() {
    return {
      filterList: ['Info', 'Log', 'Warning', 'Error'],
      filter: {
        Info: true,
        Log: true,
        Warning: true,
        Error: true,
      },
      tmpCommand: '',
      consoleMsg: '',
      settingsVisible: false,
      settings: {
        clear: true,
        highlight: true,
      },
      historyCmd: [''],
      currentCmdIndex: 0,
      codeOptions: {},
      cmdOptions: {},
      preCursorPos: {
        line: 0,
        ch: 0,
      },
    }
  },
  created() {
    this.settings = this.consoleSettings
    this.initOptions()
  },
  mounted() {
    setTimeout(() => {
      const codeArea = this.$refs.cmdArea
      codeArea.refresh()
    })
  },
  computed: {
    ...mapState(['iframeH', 'consoleH', 'consoleSettings', 'consoleInfo']),
  },
  watch: {
    currentCmdIndex(newIndex) {
      this.consoleMsg = this.historyCmd[newIndex]
      this.$refs.cmdArea.codemirror.setCursor({ line: 0, ch: 0 })
    },
  },
  methods: {
    ...mapMutations([
      'setIframeH',
      'setConsoleH',
      'setIframeSVisible',
      'setIframeHVisible',
      'setConsoleSettings',
      'setConsoleInfo',
      'setConsoleInfoCount',
    ]),
    resize(e) {
      /**
       * 鼠标拖拉console分隔栏改变console和iframe的高度
       * 同时要在iframe上显示遮罩层避免鼠标划入iframe中导致事件失效
       */
      this.setIframeSVisible(true)
      this.setIframeHVisible(true)
      const starY = e.clientY
      const consoleH = this.consoleH
      const iframeH = this.iframeH
      const viewH = consoleH + iframeH
      document.onmousemove = (ev) => {
        const iEvent = ev || event
        const finH = consoleH - iEvent.clientY + starY
        if (finH > 25 && viewH - finH > 0) {
          this.setConsoleH(finH)
          this.setIframeH(viewH - finH)
        }
        document.onmouseup = () => {
          this.setIframeSVisible(false)
          this.setIframeHVisible(false)
          document.onmouseup = null
          document.onmousemove = null
        }
      }
    },
    minimalConsole() {
      const consoleH = this.consoleH
      const iframeH = this.iframeH
      const viewH = consoleH + iframeH
      this.setConsoleH(25)
      this.setIframeH(viewH - 25)
    },
    scrollToBottom() {
      const logList = this.$refs.consoleList.querySelectorAll('.log-list')
      logList[logList.length - 1].scrollIntoView(false)
    },
    closeSettings() {
      this.setConsoleSettings(this.settings)
      this.settingsVisible = !this.settingsVisible
    },
    initOptions() {
      const codeOptions = {
        mode: 'text/javascript',
        readOnly: 'nocursor',
        matchBrackets: false,
        scrollPastEnd: false,
        scrollbarStyle: 'null',
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-foldgutter'],
      }
      this.codeOptions = codeOptions
      const cmdOptions = {
        mode: 'text/javascript',
        lineWrapping: true,
      }
      this.cmdOptions = cmdOptions
    },
    handleCmd(e) {
      const key = e.keyCode
      const cm = this.$refs.cmdArea.codemirror
      switch (key) {
        case 38: {
          const { line, ch } = cm.getCursor()
          if (line === 0 && ch === 0) {
            if (this.currentCmdIndex >= 1) this.currentCmdIndex--
          }
          break
        }
        case 40: {
          const outside = cm.getCursor().outside
          if (outside === 1) {
            if (this.currentCmdIndex < this.historyCmd.length - 1)
              this.currentCmdIndex++
          }
          break
        }
      }
    },
    exeCmd() {
      const cmd = this.consoleMsg
      if (cmd) {
        const list = this.historyCmd
        new IframeConsole().exeCmd(cmd)
        this.consoleMsg = ''
        list.pop()
        list.push(cmd)
        list.push('')
        if (this.currentCmdIndex !== list.length - 2) {
          this.currentCmdIndex = list.length - 1
        } else {
          this.currentCmdIndex++
        }
        // 我们需要等到vue将日志列表渲染完毕后再滚动到最后一条日志
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    },
    clearLogs() {
      new IframeConsole().clear()
      this.setConsoleInfo([])
      this.setConsoleInfoCount({
        error: 0,
        warn: 0,
        info: 0,
      })
    },
    cmFold(index) {
      // console中的codemirror实例代码默认是折叠起来的
      this.$refs[`logArea${index}`][0].codemirror.execCommand('foldAll')
    },
  },
  components: {
    codemirror,
  },
}
</script>

<style lang="scss" scoped>
::v-deep.CodeMirror {
  .CodeMirror-gutter-elt {
    left: 1px !important;
  }
}
.cmd-codemirror {
  width: calc(100% - 80px);
  height: auto;
  ::v-deep.CodeMirror {
    width: 100%;
    height: auto;
    max-height: 90px;
    font-size: 14px;
    font-family: $code;
    ::-webkit-scrollbar {
      outline: none;
      width: 6px;
      height: 6px;
      background-color: $deep-4;
    }
    ::-webkit-scrollbar-track {
      background-color: $deep-4;
    }
    ::-webkit-scrollbar-thumb {
      background-color: $deep-2;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      outline: none;
      background-color: rgba(80, 80, 80, 1);
    }
    .CodeMirror-vscrollbar {
      border: none;
    }
    .CodeMirror-scroll {
      height: auto;
      max-height: 90px;
    }
  }
}
.active-dropdown-item {
  background-color: $deep-5 !important;
  color: $light-2 !important;
}
#console {
  width: 100%;
  height: 100%;
  min-height: 25px;
  .console-tab {
    height: 25px;
    background-color: $deep-3;
    color: $light-5;
    padding-left: 15px;
    position: relative;
    font-family: $code !important;
    border-left: 1px solid $deep-4;
    .title {
      i {
        font-size: 14px;
        margin-right: 5px;
      }
      span {
        font-size: 14px;
        margin-left: 5px;
        font-family: $code !important;
      }
    }
    .resize {
      height: 100%;
      cursor: n-resize;
      @include positionMiddle();
      @include setTransition(all, 0.3s, ease);
      i {
        font-size: 8px;
      }
      &:hover {
        color: $light-2;
      }
    }
    .options {
      position: absolute;
      right: 0px;
      & > div {
        height: 100%;
        width: 30px;
        i {
          color: $light-5;
          cursor: pointer;
          &:hover {
            color: $light-2;
          }
        }
        .active-opt {
          color: $primary-1;
        }
      }
    }
  }
  .console-body {
    height: calc(100% - 25px);
    .cm-list {
      overflow: auto;
      &::-webkit-scrollbar {
        outline: none;
        width: 10px;
        height: 4px;
        background-color: $deep-4;
      }
      &::-webkit-scrollbar-track {
        background-color: $deep-4;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $deep-2;
      }
      &::-webkit-scrollbar-thumb:hover {
        outline: none;
        background-color: rgba(80, 80, 80, 1);
      }
      font-family: $code;
      .log-list {
        font-size: 12px;
        .log,
        .system-error,
        .error,
        .warn,
        .mix,
        .info,
        .print,
        .mix-print {
          box-sizing: border-box;
          padding: 0 10px;
          min-height: 25px;
          ::v-deep.vue-codemirror {
            width: 100%;
            .CodeMirror {
              height: auto;
              .CodeMirror-scroll {
                position: static;
              }
            }
          }
          i {
            font-size: 12px;
            margin-right: 10px;
          }
          span::selection {
            background-color: $light-6;
          }
        }
        .system-error,
        .error {
          background-color: #290000 !important;
          border-bottom: 1px solid #5c0000 !important;
          & > .icon-error1 {
            color: #ef6066;
            font-size: 12px;
            margin-right: 10px;
          }
          pre {
            width: 100%;
            .content {
              width: 100%;
              height: 100%;
              word-wrap: break-word;
              white-space: normal;
              color: #ef6066;
              display: block;
              margin-right: 10px;
            }
          }
        }
        .log,
        .mix {
          width: 100%;
          height: auto;
          border-bottom: 1px solid $deep-2;
          & > .icon-lfmonth {
            color: $light-6;
          }
          pre {
            white-space: pre-wrap;
            .cm-string {
              white-space: pre;
              max-width: 100% !important;
              word-wrap: break-word !important;
            }
          }
        }
        .mix {
          .code-log {
            background-color: $light-1 !important;
          }
        }
        .info {
          width: 100%;
          border-bottom: 1px solid $primary-2 !important;
          color: #aad0f3;
          .content {
            word-wrap: break-word;
            white-space: normal;
            display: block;
            margin-right: 10px;
          }
          & > .icon-info {
            color: $primary-2;
          }
        }
        .system-error {
          pre {
            .row,
            .col {
              margin: 0 5px;
              color: $light-6;
              white-space: nowrap !important;
              padding: 0;
            }
          }
        }
        .warn {
          background-color: #332b00 !important;
          border-bottom: 1px solid #665500 !important;
          pre {
            width: 100%;
            .content {
              width: 100%;
              height: 100%;
              word-wrap: break-word;
              white-space: normal;
              color: $warning-2 !important;
              display: block;
              margin-right: 10px;
            }
          }
          & > .icon-warn1 {
            color: $warning-2;
          }
        }
        .print,
        .mix-print {
          border-bottom: 1px solid $light-6;
          & > .icon-lfmonth {
            color: $light-5;
            transform: rotate(180deg);
          }
        }
      }
    }
    .settings {
      padding: 0 15px;
      font-family: $code;
      overflow: auto;
      display: flex;
      ::v-deep.v-label {
        font-size: 14px;
      }
      &::-webkit-scrollbar {
        outline: none;
        width: 10px;
        height: 4px;
        background-color: $deep-4;
      }
      &::-webkit-scrollbar-track {
        background-color: $deep-4;
      }
      &::-webkit-scrollbar-thumb {
        background-color: $deep-2;
      }
      &::-webkit-scrollbar-thumb:hover {
        outline: none;
        background-color: rgba(80, 80, 80, 1);
      }
    }
    .textarea-box {
      border-top: 2px solid $deep-3;
      border-bottom: 2px solid $deep-3;
      .print-icon {
        color: $primary-1;
        margin-left: 5px;
      }
      .run-btn {
        font-family: $code;
        border-radius: 0px;
        margin-left: 5px;
      }
    }
  }
}
</style>
