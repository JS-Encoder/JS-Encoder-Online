<template>
  <div id="instanceBox">
    <div v-show="!loaded" class="loader flex-jcc">
      <div class="loader-content d-flex flex-clo flex-ai">
        <instance-loader class="page-loader"></instance-loader>
        <span class="tip">请求成功！实例加载中</span>
        <span class="tip">正在请求实例</span>
      </div>
    </div>
    <instance></instance>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Instance from './components/instance.vue'
import InstanceLoader from './components/loader.vue'
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
    }
  },
  mounted() {
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
      // 完成后隐藏全页面的加载动画
      this.loaded = true
    }, 3000)
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
    ...mapState(['iframeH', 'consoleH', 'editorW', 'iframeW']),
  },
  methods: {
    ...mapMutations(['setIframeH', 'setIframeW', 'setEditorW', 'setConsoleH']),
  },
  components: {
    Instance,
    InstanceLoader,
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
