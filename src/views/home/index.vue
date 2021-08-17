<template>
  <div id="home" class="flex">
    <div class="preview">
      <img class="preview1-img" src="http://picstore.lliiooiill.cn/preview1.svg?123123" alt="">
      <img class="preview2-img" src="http://picstore.lliiooiill.cn/preview2.svg?12312313" alt="">
    </div>
    <div class="main-content">
      <div class="slogan flex flex-clo">
        <span class="slogan-1 title-xl">简洁易用，功能丰富的 WEB 编辑器</span>
        <span class="slogan-2 title-m">一个分享代码，共同学习的平台</span>
      </div>
      <div class="btn-opt">
        <v-btn class="btn-create" dark x-large color="#1980ff">创建新实例</v-btn>
        <v-btn class="btn-offline" dark x-large outlined color="#1980ff">前往离线版</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss" scoped>
@include keyframes(fade-right) {
  0% {
    opacity: 0;
    margin-left: 100px;
  }
  100% {
    opacity: 1;
    margin-left: 0;
  }
}

@include keyframes(fade-left) {
  0% {
    opacity: 0;
    margin-right: 100px;
  }
  100% {
    opacity: 1;
    margin-right: 0;
  }
}

#home {
  height: 100%;
  position: relative;
  .preview {
    .preview1-img,
    .preview2-img {
      width: 460px;
      position: absolute;
      opacity: 0;
    }
    .preview1-img {
      top: 40%;
      right: 0;
      transform: translateY(-50%);
      box-shadow: $shadow-1;
      @include animation(fade-left, 0.3s, 0.3s, ease, forwards);
    }
    .preview2-img {
      top: 55%;
      right: 6%;
      box-shadow: $shadow-2;
      @include animation(fade-left, 0.3s, 0.5s, ease, forwards);
    }
  }
  .main-content {
    margin: 200px 0 0 180px;
    .slogan {
      margin-bottom: 100px;
      .slogan-1,
      .slogan-2 {
        opacity: 0;
        @include animation(fade-right, 0.3s, 0.3s, ease, forwards);
      }
      .slogan-1 {
        margin-bottom: 25px;
      }
    }
    .btn-opt {
      .btn-create,
      .btn-offline {
        opacity: 0;
        @include animation(fade-right, 0.3s, 0.5s, ease, forwards);
      }
      .btn-create {
        margin-right: 25px;
      }
    }
  }
}
@include screenLG {
  #home {
    height: calc(100vh - 70px);
    min-height: 800px;
  }
}
</style>
