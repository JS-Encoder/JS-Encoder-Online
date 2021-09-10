<template>
  <v-app id="app" :class="bgcClass" :style="curBgcStyle">
    <jse-header v-if="routeName!=='Work'" />
    <section class="app-content" :class="routeName==='Work'?'app-full-screen':''">
      <router-view />
      <jse-snackbar />
    </section>
    <jse-footer v-if="routeName!=='Work'" />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Header from '@components/header.vue'
import Footer from '@components/footer.vue'
import Snackbar from '@components/snackbar.vue'
export default {
  data() {
    return {
      bgcClass: '',
      curBgcStyle: {},
    }
  },
  mounted() {
    this.setBgc()
  },
  computed: {
    ...mapState(['curUserDetail']),
    routeName() {
      return this.$route.name
    },
    path() {
      return this.$route.path.replace('/', '') || 'home'
    },
    userBgc() {
      return this.curUserDetail.bgc
    },
  },
  watch: {
    path() {
      this.setBgc()
    },
    userBgc() {
      this.setBgc()
    },
  },
  methods: {
    ...mapMutations(['setLoginInfo', 'setLoginState']),
    setBgc() {
      // 根据路由更换不同的背景
      this.bgcClass = ''
      this.curBgcStyle = {}
      let path = this.path
      const list = ['home', 'features', 'feedback']
      if (/^user/.test(path)) {
        this.bgcClass = 'user-bgc'
        this.curBgcStyle.backgroundImage = `linear-gradient(rgba(${this.curUserDetail.bgc},0.7) -50px,rgb(26,26,26) 300px)`
      } else if (list.includes(path)) {
        this.bgcClass = `bgc-animation bgc-before ${path}-bgc`
      }
    },
  },
  components: {
    'jse-header': Header,
    'jse-footer': Footer,
    'jse-snackbar': Snackbar,
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  color: $light-2;
  font-family: $font;
  background-color: $deep-5;
  position: relative;
  @include setTransition(all, 0.3s, ease);
  .app-content {
    min-height: calc(100vh - 70px);
  }
}
.app-full-screen {
  height: 100% !important;
}
.bgc-animation {
  background-position: 50% 0;
  background-size: 200% !important;
  @include animation(background-fade, 0.5s, 0.3s, ease, forwards);
}
.bgc-before {
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    backdrop-filter: blur(200px);
    position: absolute;
  }
}
.home-bgc {
  background-image: linear-gradient(
    135deg,
    $primary-1 0,
    $deep-2 10%,
    $deep-5 15%,
    $deep-6 25%
  ) !important;
  &:before {
    background-color: rgba(25, 128, 255, 0.1);
  }
}
.features-bgc {
  background-image: linear-gradient(
    135deg,
    $deep-1 0,
    $deep-2 15%,
    $deep-5 35%
  ) !important;
  &:before {
    background-color: rgba(60, 60, 60, 0.1);
  }
}
.feedback-bgc {
  background-image: linear-gradient(
    135deg,
    $pink-1 0,
    $deep-2 15%,
    $deep-5 35%
  ) !important;
  &:before {
    background-color: rgba(194, 24, 91, 0.1);
  }
}
.user-bgc {
  background-image: linear-gradient(
    rgba(25, 128, 255, 0.3) -50px,
    $deep-5 300px
  );
}
@include screenLG {
  .app-content {
    min-height: calc(100vh - 70px);
  }
}
@include screenXL {
  .app-content {
    min-height: calc(100vh - 70px);
  }
}
</style>
