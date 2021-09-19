<template>
  <div id="home" class="d-flex flex-clo">
    <div class="introduce d-flex">
      <div class="preview">
        <img class="preview1-img" src="http://images.lliiooiill.cn/preview3.svg?1" alt="">
        <img class="preview2-img" src="http://images.lliiooiill.cn/preview2.svg" alt="">
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
    </div>
    <div class="features">
      <div class="features-question">
        <span class="logo-text">JS Encoder</span>
        <span class="title-xl"> 能做什么？</span>
      </div>
      <ul class="features-list">
        <li v-for="(item, index) in featuresList" :key="index" class="d-flex flex-clo">
          <div>
            <i class="icon iconfont" :class="item.icon" :style="{color:item.color}"></i>
            <span class="feature-title">{{item.title}}</span>
          </div>
          <span class="feature-content">{{item.content}}</span>
        </li>
      </ul>
    </div>
    <login-verify></login-verify>
  </div>
</template>

<script>
import loginVerify from '@components/dialog/loginVerify'
export default {
  name: 'Home',
  data() {
    return {
      featuresList: [
        {
          icon: 'icon-yuncunchu',
          title: '云存储',
          content: '保存代码至云端，分享你的实例链接，让更多用户浏览你的作品。',
          color: '#1296db',
        },
        {
          icon: 'icon-daorudaochu',
          title: '导入导出',
          content: '可导入本地代码进行在线编辑，也可将编写好的代码导出至本地。',
          color: '#d81e06',
        },
        {
          icon: 'icon-gexinghuapeizhi',
          title: '个性化设置',
          content: '可针对你的编码习惯进行个性化，多样化的编码设置。',
          color: '#d4237a',
        },
        {
          icon: 'icon-bianma',
          title: '编码',
          content:
            '支持 HTML，CSS 和 JavaScript 以及它们 8 种预处理语言编译及高亮。',
          color: '#1890ff',
        },
        {
          icon: 'icon-markdown1',
          title: 'Markdown',
          content:
            '实时预览、同步滚动、编写文档更加顺畅；运用工具栏和丰富的快捷键，快速生成语法。',
          color: '#05104b',
        },
        {
          icon: 'icon-console1',
          title: 'Console',
          content:
            '模拟 Chrome 原生 Console, 支持多种类型的日志高亮显示；也可直接输入命令进行调试。',
          color: '#1afa29',
        },
      ],
    }
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
  .introduce {
    margin: 0 auto;
    width: 100%;
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
      margin: 200px 0 0 0;
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
  .features {
    .features-question {
      margin: 0 auto;
      .logo-text {
        color: #1980ff;
        font-size: 48px;
      }
    }
    .features-list {
      display: grid;
      grid-gap: 100px 100px;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      margin: 0 auto;
      margin-top: 50px;
      padding: 50px 0 150px 0;
      .icon {
        font-size: 40px;
        text-shadow: 0 1px 3px $deep-6;
      }
      .feature-title {
        margin-left: 10px;
        font-size: 20px;
      }
      .feature-content {
        color: $light-4;
        margin-top: 10px;
      }
    }
  }
}
@include Mobile {
  #home {
    .introduce {
      min-height: calc(100vh - 70px);
      .main-content {
        width: 100%;
        margin: 0;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
@include PC {
  #home {
    .introduce {
      height: calc(100vh - 70px);
      min-height: 700px;
      max-width: 1150px;
    }
    .features {
      min-height: 80vh;
      .features-list,
      .features-question {
        max-width: 1150px;
      }
    }
  }
}
@include screenXS {
  #home {
    .introduce {
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
          .slogan-1 {
            font-size: 24px;
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
    .features {
      margin-top: 100px;
      .features-list,
      .features-question {
        width: 85%;
      }
    }
  }
}
@include screenSM {
  #home {
    padding-bottom: 100px;
    .introduce {
      min-height: 100vh;
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
  .features {
    margin-top: 100px;
    .features-list,
    .features-question {
      width: 85%;
    }
  }
}
@include screenMD {
  #home {
    .introduce {
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
    .features-list,
    .features-question {
      width: 85%;
    }
  }
}
</style>
