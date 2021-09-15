<template>
  <div id="home" class="d-flex">
    <div class="preview">
      <img class="preview1-img" src="http://picstore.lliiooiill.cn/preview1.svg?123123" alt="">
      <img class="preview2-img" src="http://picstore.lliiooiill.cn/preview2.svg?12312313" alt="">
    </div>
    <div class="main-content">
      <div class="slogan d-flex flex-clo">
        <span class="slogan-1 title-xl">简洁易用，功能丰富的 WEB 编辑器</span>
        <span class="slogan-2 title-m">一个分享代码，共同学习的平台</span>
      </div>
      <div class="btn-opt">
        <v-btn class="btn-create" x-large color="primary" @click="newWork">创建新实例</v-btn>
        <v-btn class="btn-offline" x-large outlined color="primary" @click="goToOffline">前往离线版</v-btn>
      </div>
    </div>
    <login-verify></login-verify>
  </div>
</template>

<script>
import loginVerify from '@components/dialog/loginVerify'
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    newWork() {
      this.$router.push({ name: 'NewWork' })
    },
    goToOffline() {
      window.open('http://jsencoder.lliiooiill.cn/')
    },
  },
  components: {
    loginVerify,
  },
}
</script>

<style lang="scss" scoped>
#home {
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
@include Mobile {
  #home {
    min-height: calc(100vh - 70px);
    .main-content {
      width: 100%;
      margin: 50px 0 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
@include PC {
  #home {
    height: calc(100vh - 70px);
    min-height: 800px;
  }
}
@include screenXS {
  #home {
    min-height: 800px;
    .preview {
      .preview1-img,
      .preview2-img {
        width: 85%;
        max-width: 350px;
      }
      .preview1-img {
        top: 40%;
      }
      .preview2-img {
        top: 45%;
      }
    }
    .main-content {
      .slogan {
        align-items: center;
        margin-bottom: 450px;
        font-weight: 600;
        .slogan-1 {
          font-size: 20px;
        }
      }
      .btn-opt {
        width: 85%;
        display: flex;
        flex-direction: column;
        .btn-create {
          margin-right: 0;
          margin-bottom: 15px;
        }
      }
    }
  }
}
@include screenSM {
  #home {
    min-height: 1vh;
    padding-bottom: 100px;
    .preview {
      .preview1-img,
      .preview2-img {
        width: 65%;
        max-width: 450px;
      }
      .preview1-img {
        top: 45%;
      }
      .preview2-img {
        top: 51%;
      }
    }
    .main-content .slogan {
      margin-bottom: 80%;
    }
  }
}
@include screenMD {
  #home {
    .preview {
      .preview1-img,
      .preview2-img {
        width: 350px;
      }
    }
    .main-content {
      margin: 200px 0 0 50px;
    }
  }
}
</style>
