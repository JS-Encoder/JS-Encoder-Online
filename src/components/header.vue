<template>
  <div id="header">
    <v-btn class="menu-icon" icon height="50" width="50" @click="showNav = !showNav">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer style="height:100vh" absolute temporary v-model="showNav">
      <v-list>
        <v-list-item link v-for="item in navList" :key="item.name" @click="navJumpTo(item)">
          <v-badge color="primary" dot v-if="item.text==='新特性' && hasNewFeatures">
            <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-badge>
          <v-list-item-title v-else>{{item.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-link :to="{name:'Home'}">
      <div class="logo pointer no-select d-flex flex-ai">
        <img class="logo-img" src="../assets/logo/logo.svg" alt="">
        <span class="logo-content">JS Encoder</span>
      </div>
    </router-link>
    <div class="vert-divide-line"></div>
    <nav class="d-flex flex-1 no-select pointer">
      <v-btn class="nav-item rounded-0" depressed v-for="(item, index) in navList" :key="index"
        :plain="curRouteName !== item.name" tile @click="navJumpTo(item)">
        <v-badge color="primary" dot v-if="item.text==='新特性' && hasNewFeatures">
          {{item.text}}
        </v-badge>
        <span v-else>{{item.text}}</span>
      </v-btn>
    </nav>
    <v-spacer></v-spacer>
    <div class="account d-flex flex-ai">
      <header-account />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HeaderAccount from './headerAccount.vue'
import localStorage from '@utils/local-storage'

export default {
  data() {
    return {
      navList: Object.freeze([
        {
          text: '探索',
          name: 'Explore',
        },
        {
          text: '新特性',
          name: 'Features',
        },
        {
          text: '反馈',
          name: 'Feedback',
        },
        {
          text: 'GitHub',
        },
      ]),
      showNav: false,
    }
  },
  mounted() {
    this.judgeShowBadge()
  },
  computed: {
    ...mapState(['hasNewFeatures']),
    curRouteName() {
      return this.$route.name
    },
  },
  methods: {
    ...mapMutations(['setHasNewFeatures']),
    navJumpTo(navItem) {
      if (navItem.text === 'GitHub') {
        window.open('https://github.com/Longgererer/JS-Encoder-Online')
      } else {
        this.$router.push({ name: navItem.name }).catch(() => {})
      }
    },
    judgeShowBadge() {
      // 获取JS Encoder最新版本号，如果和本地localStorage存储的一致，则表示用户已读，不显示徽章
      this.$http.repoLatestV().then((res) => {
        const latestV = res.tag_name
        this.setHasNewFeatures(
          latestV !== localStorage.get('latestViewVersion')
        )
      })
    },
  },
  components: {
    'header-account': HeaderAccount,
  },
}
</script>

<style lang="scss" scoped>
#header {
  height: 70px;
  padding: 0 30px;
  position: relative;
  // top: 0;
  z-index: 1;
  display: flex;
  // backdrop-filter: blur(10px);
  .menu-icon {
    display: none;
  }
  .logo {
    height: 100%;
    .logo-img {
      width: 40px;
      height: 40px;
    }
    .logo-content {
      font-size: 20px;
      margin-left: 15px;
      color: $light-2;
    }
  }
  .vert-divide-line {
    height: 100%;
    position: relative;
    margin: 0 25px 0 60px;
    &::before {
      content: '';
      display: inline-block;
      width: 1px;
      height: 25px;
      background-color: $light-7;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  nav {
    height: 100%;
    .nav-item {
      width: 110px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  ::v-deep.v-overlay {
    bottom: -100vh;
  }
}

@include Mobile {
  #header {
    height: 50px;
    .menu-icon {
      display: block;
    }
    .logo .logo-img {
      width: 30px;
      height: 30px;
    }
    .vert-divide-line,
    nav {
      display: none !important;
    }
  }
}
@include screenXS {
  #header {
    padding: 0;
    .logo {
      margin-left: 10px;
      .logo-content {
        display: none;
      }
    }
  }
}
@include screenSM {
  #header {
    padding: 0 10px;
    .logo {
      margin-left: 20px;
      .logo-content {
        font-size: 18px;
        margin-left: 10px;
      }
    }
  }
}
</style>
