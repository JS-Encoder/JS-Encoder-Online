<template>
  <div id="fullScreenBar" class="borbox">
    <!-- <div class="scale-box d-flex flex-ai flex-jcc">
      <span class="proportion">{{scale}}%</span>
      <v-slider step="25" min="25" max="500" hide-details v-model="scale" :show-tooltip="false">
      </v-slider>
    </div> -->
    <div class="opt-list d-flex">
      <div class="opt d-flex flex-ai flex-jcc" @click="refresh">
        <i class="icon iconfont icon-zhongzhi"></i>
      </div>
      <div class="opt d-flex flex-ai flex-jcc" @click="exitFullScreen">
        <i class="icon iconfont icon-suoxiao"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    getIframeBody: Function,
  },
  data() {
    return {
      scale: 100,
    }
  },
  watch: {
    scale(newScale) {
      this.changeView(newScale)
    },
  },
  methods: {
    refresh() {
      this.$emit('runCode')
      setTimeout(() => {
        console.log('scale')
        this.changeView(this.scale)
      }, 500)
    },
    exitFullScreen() {
      const iframe = this.$props.getIframeBody()
      const style = iframe.contentWindow.document.body.style
      style.transformOrigin = this.transformOrigin
      style.transform = this.transform
      this.$emit('exitFullScreen', false)
    },
    changeView(newScale) {
      const iframe = this.$props.getIframeBody()
      const style = iframe.contentWindow.document.body.style
      newScale /= 100
      this.transformOrigin = style.transformOrigin
      this.transform = style.transform
      this.width = style.width
      style.transformOrigin = 'top left'
      style.transform = `scale(${newScale})`
      style.width = `calc(100vw/${newScale})`
    },
  },
}
</script>

<style lang="scss" scoped>
#fullScreenBar {
  width: 100%;
  height: 41px;
  border-bottom: 1px solid $deep-5;
  position: relative;
  background-color: $deep-2;
  .opt-list {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    .opt {
      width: 50px;
      height: 100%;
      color: $light-5;
      cursor: pointer;
      &:hover {
        color: $light-2;
      }
      i {
        font-size: 22px;
      }
      .icon-zhongzhi {
        font-size: 24px;
      }
    }
  }
  .scale-box {
    width: 300px;
    height: 100%;
    color: $light-2;
    .proportion {
      margin-right: 20px;
    }
    .el-slider {
      width: 200px;
      height: 100%;
    }
  }
}
</style>
