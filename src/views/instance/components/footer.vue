<template>
  <div id="instanceFooter" class="d-flex no-select borbox text-xs">
    <div class="d-flex flex-ai tip flex-1">
      <i class="icon iconfont icon-zhuanhuan load-icon text-xs" v-show="isCompiling"></i>
      <span class="tip-text" v-show="isCompiling">代码编译中，请等待...</span>
    </div>
    <div class="d-flex flex-sh cursor-pos flex-ai">
      <span v-show="!cursorPos.selections">Ln {{cursorPos.ln}},</span>
      <span v-show="!cursorPos.selections">Col {{cursorPos.col}}</span>
      <span v-show="cursorPos.selections">{{cursorPos.selections}} selections</span>
      <span v-show="cursorPos.selected">({{cursorPos.selected}} selected)</span>
    </div>
    <div class="d-flex flex-sh spaces flex-ai">
      <span>Spaces: {{instanceSetting.indent.width}}</span>
    </div>
    <div class="console-info-count d-flex flex-ai">
      <span><i class="icon iconfont icon-error"></i>{{consoleInfoCount.error}}</span>
      <span><i class="icon iconfont icon-warn"></i>{{consoleInfoCount.warn}}</span>
      <span><i class="icon iconfont icon-info1"></i>{{consoleInfoCount.info}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    isCompiling: Boolean,
    cursorPos: Object,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['instanceSetting', 'consoleInfoCount']),
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss" scoped>
@keyframes loadRotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#instanceFooter {
  width: 100%;
  height: 20px;
  background-color: $primary-2;
  padding: 0 15px;
  color: $light-2;
  .tip {
    .load-icon {
      line-height: 13px;
      animation: loadRotate 2s infinite;
    }
    .tip-text {
      padding-left: 5px;
    }
  }
  .cursor-pos,
  .spaces {
    padding-right: 15px;
  }
  .console-info-count {
    span {
      display: inline-flex;
      align-items: center;
      padding-right: 5px;
      i {
        font-size: 14px;
        padding-right: 2px;
      }
    }
  }
}
</style>
