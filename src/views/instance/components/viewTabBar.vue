<template>
  <div id="viewTabBar" class="d-flex no-select">
    <div class="tab d-flex flex-1">
      <div class="browser-tab d-flex flex-ai flex-jcc" :class="showView?'active-tab':''">
        <i class="icon iconfont icon-yanjing"></i>
        View
      </div>
    </div>
    <div class="tools d-flex flex-sh">
      <v-btn height="30" width="30" icon title="刷新" @click="refresh">
        <i class="icon iconfont icon-zhongzhi"></i>
      </v-btn>
      <v-btn height="30" width="30" icon title="全屏" @click="fullScreen">
        <i class="icon iconfont icon-fangda"></i>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showView: true,
    }
  },
  methods: {
    refresh() {
      this.$emit('runCode', true)
    },
    fullScreen() {
      this.$emit('fullScreen', true)
    },
  },
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
    & > .v-btn {
      width: 40px;
      margin-right: 5px;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
