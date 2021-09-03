<template>
  <div id="viewTabBar" class="d-flex no-select">
    <div class="tab d-flex flex-1">
      <div class="browser-tab d-flex flex-ai flex-jcc" :class="showView?'active-tab':''">
        <i class="icon iconfont icon-yanjing"></i>
        View
      </div>
    </div>
    <div class="tools d-flex flex-sh">
      <div class="d-flex flex-ai flex-jcc" title="刷新" @click="refresh">
        <i class="icon iconfont icon-zhongzhi"></i>
      </div>
      <div class="d-flex flex-ai flex-jcc" title="全屏" @click="fullScreen">
        <i class="icon iconfont icon-fangda"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showView: true
    }
  },
  methods: {
    refresh() {
      this.$emit('runCode')
    },
    fullScreen() {
      this.$emit('fullScreen', true)
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
#viewTabBar {
  width: 100%;
  height: 30px;
  background-color: $deep-3;
  .tab {
    .browser-tab {
      padding: 0 20px;
      color: $light-5;
      background-color: $deep-2;
      font-size: 14px;
      cursor: pointer;
      i {
        margin-right: 5px;
        font-size: 16px;
      }
      &:hover {
        color: $light-2;
      }
    }
    .active-tab {
      background-color: $deep-4;
      color: $light-2;
    }
  }
  .tools {
    font-size: 18px;
    color: $light-5;
    & > div {
      width: 40px;
      cursor: pointer;
      i {
        font-size: 18px;
      }
      &:hover {
        color: $light-2;
      }
    }
  }
}
</style>
