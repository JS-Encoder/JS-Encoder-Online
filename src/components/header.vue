<template>
  <div id="header" class="d-flex">
    <router-link :to="{name:'Home'}">
      <div class="logo pointer no-select d-flex flex-ai">
        <img class="logo-img" src="../assets/logo/logo.svg" alt="">
        <span class="logo-content">JS Encoder</span>
      </div>
    </router-link>
    <div class="vert-divide-line"></div>
    <nav class="d-flex flex-1 no-select pointer">
      <v-btn v-for="(item, index) in navList" :key="index" class="nav-item rounded-0" @click="navJumpTo(item)" depressed
        :plain="curRoutePath !== item.route" tile>
        <v-badge v-if="item.name==='新特性' && showBadge" dot color="primary">
          {{item.name}}
        </v-badge>
        <span v-else>{{item.name}}</span>
      </v-btn>
    </nav>
    <div class="account d-flex flex-ai">
      <header-account />
    </div>
  </div>
</template>

<script>
import HeaderAccount from './headerAccount.vue'
import localStorage from '@utils/local-storage'

export default {
  data() {
    return {
      navList: [
        {
          name: '探索',
          route: 'Explore',
        },
        {
          name: '新特性',
          route: 'Features',
        },
        {
          name: '反馈',
          route: 'Feedback',
        },
        {
          name: 'GitHub',
        },
      ],
      showBadge: true,
    }
  },
  created() {
    this.judgeShowBadge()
  },
  methods: {
    navJumpTo(navItem) {
      if (navItem.name === 'GitHub') {
        window.open('https://github.com/Longgererer/JS-Encoder-Online')
      } else {
        this.$router
          .push({
            name: navItem.route,
          })
          .catch(() => {})
      }
    },
    judgeShowBadge() {
      // 获取JS Encoder最新版本号，如果和本地localStorage存储的一致，则表示用户已读，不显示徽章
      this.$http.repoLatestV().then((res) => {
        const latestV = res.tag_name
        this.showBadge = latestV !== localStorage.get('latestViewVersion')
      })
    },
  },
  computed: {
    curRoutePath() {
      return this.$route.path
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
}
</style>
