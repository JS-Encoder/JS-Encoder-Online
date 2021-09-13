<template>
  <div id="instanceBox">
    <div v-if="!loaded" class="loader flex-jcc">
      <div class="loader-content d-flex flex-clo flex-ai">
        <instance-loader class="page-loader"></instance-loader>
        <span class="tip">{{tip}}</span>
      </div>
    </div>
    <instance v-else @init="init"></instance>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Instance from './components/instance.vue'
import InstanceLoader from './components/loader.vue'
import IframeHandler from '@utils/editor/handleInstanceView'
/* css */
import '@assets/css/codemirror.css'
import '@assets/css/codemirror-dialog.css'
import '@assets/css/foldgutter.css'
import '@assets/css/show-hint.css'
import '@assets/css/tern.css'
import '@assets/themes/default.css'
export default {
  data() {
    return {
      loaded: false,
      clientWidth: window.innerWidth,
      clientHeight: document.documentElement.clientHeight,
      tip: '实例页面加载中',
      rendered: false,
    }
  },
  created() {
    this.resetInstanceState()
  },
  async mounted() {
    await this.init()
    this.rendered = true
  },
  watch: {
    clientWidth(newW, oldW) {
      /**
       * 当可见窗口宽度改变时，更改编辑窗口和iframe的宽度
       * 但这两个窗口的宽度不小于100px，如果任意一个窗口达到了最小值，只改变另一个窗口的宽度
       */
      const editorW = this.editorW
      const iframeW = this.iframeW
      const gapW = newW - oldW
      if (editorW <= 100 && iframeW <= 100 && gapW < 0) {
        return void 0
      }
      if (editorW <= 100 && gapW < 0) {
        this.setIframeW(iframeW + gapW)
        return void 0
      } else if (iframeW <= 100 && gapW < 0) {
        this.setEditorW(editorW + gapW)
        return void 0
      }
      const avgW = gapW / 2
      this.setIframeW(iframeW + avgW)
      this.setEditorW(editorW + avgW)
    },
    clientHeight(newH, oldH) {
      /**
       * 当可见窗口高度改变时，修改iframe和console的宽度
       * console和iframe的高度不能小于25px和100px，如果任意一个窗口达到了最小值，只改变另一个窗口的高度
       */
      const iframeH = this.iframeH
      const consoleH = this.consoleH
      const gapH = newH - oldH
      if (consoleH <= 25 && iframeH <= 100 && gapH < 0) {
        return void 0
      }
      if (consoleH <= 25 && gapH < 0) {
        this.setIframeH(iframeH + gapH)
        return void 0
      } else if (iframeH <= 100 && gapH < 0) {
        this.setConsoleH(consoleH + gapH)
        return void 0
      }
      const avgH = gapH / 2
      this.setIframeH(iframeH + avgH)
      this.setConsoleH(consoleH + avgH)
    },
  },
  computed: {
    ...mapState([
      'iframeH',
      'consoleH',
      'editorW',
      'iframeW',
      'curInstanceDetail',
      'loginState',
      'loginInfo',
    ]),
    ...mapGetters(['isSelfProfile'])
  },
  methods: {
    ...mapMutations([
      'setIframeH',
      'setIframeW',
      'setEditorW',
      'setConsoleH',
      'setCurInstanceDetail',
      'setAllPrep',
      'setCurTab',
      'setInstancesCode',
      'setInstanceSetting',
      'setAllInstanceExtLinks',
      'resetInstanceState',
    ]),
    async init() {
      this.loaded = false
      await this.initInstanceInfo()
      if (!this.rendered) {
        await this.calcSize()
      }
      // 完成后隐藏全页面的加载动画
      this.loaded = true
    },
    async calcSize() {
      this.tip = '实例页面加载中'
      return new Promise((resolve) => {
        setTimeout(() => {
          const { clientHeight: clientH, clientWidth: clientW } = document.body
          // iframe的高度等于整个可见窗口高度减去header和console的高度
          const iframeH = clientH - this.consoleH - 41 - 30 - 20
          this.setIframeH(iframeH)
          // 将iframe和编辑窗口的宽度等分，需要减去分割线和侧边工具栏的宽度
          const avgW = (clientW - 41 - 4) / 2
          if (avgW % 1 !== 0) {
            const floorAvg = Math.floor(avgW)
            this.setIframeW(floorAvg)
            this.setEditorW(floorAvg + 1)
          } else {
            this.setIframeW(avgW)
            this.setEditorW(avgW)
          }
          window.onresize = () => {
            this.clientWidth = window.innerWidth
            this.clientHeight = document.documentElement.clientHeight
          }
          resolve()
        }, 1500)
      })
    },
    async initInstanceInfo() {
      const route = this.$route
      if (route.name !== 'Work') return void 0
      const { username, instanceID: exampleId } = route.params
      this.tip = '正在请求实例信息'
      try {
        const res = await this.$http.getWork({ username, exampleId })
        if (res.state) {
          const {
            exampleId: id,
            exampleName: title,
            codeContent,
            label: tags,
            htmlStyle,
            cssStyle,
            jsStyle,
          } = res.data
          const { instanceCode, instanceExtLinks, headTags } =
            JSON.parse(codeContent)
          this.setCurInstanceDetail({ username, id, title, tags, saved: true })
          this.setAllPrep([htmlStyle, cssStyle, jsStyle])
          this.setCurTab(htmlStyle)
          this.setInstancesCode(instanceCode)
          this.setInstanceSetting({ name: 'headTags', value: headTags })
          this.setAllInstanceExtLinks(instanceExtLinks)
          this.$message.success('获取实例信息成功！')
        } else {
          this.$message.error('获取实例信息失败！')
          this.$router.replace({ name: '404' })
        }
      } catch (err) {
        console.log(err)
        this.$router.replace({ name: '404' })
      }
    },
  },
  components: {
    Instance,
    InstanceLoader,
  },
  beforeRouteLeave(to, from, next) {
    if (
      from.name === 'Work' &&
      this.isSelfProfile &&
      this.curInstanceDetail.saved === false
    ) {
      this.$alert({
        content: '你对当前实例做出的修改将不会被保存',
        okColor: 'error',
        okText: '退出',
      }).then((isLogout) => {
        if (isLogout) {
          new IframeHandler().clearIframe()
        }
        next(isLogout)
      })
    } else {
      next(true)
    }
  },
}
</script>

<style lang="scss" scoped>
#instanceBox {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  position: relative;
  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: $deep-4;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    @include animation(bgc-fade, 3s, 0s, ease, infinite);
    .loader-content {
      margin-top: 100px;
      .page-loader {
        width: 250px;
        height: 200px;
      }
      .tip {
        font-size: 16px;
        color: $light-2;
      }
    }
  }
}
</style>
