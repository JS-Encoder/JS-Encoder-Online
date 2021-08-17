<template>
  <div id="header" class="flex">
    <div class="logo pointer no-select flex flex-ai">
      <img class="logo-img" src="../assets/logo/logo.svg" alt="">
      <span class="logo-content">JS Encoder</span>
    </div>
    <div class="vert-divide-line"></div>
    <nav class="flex flex-1 no-select pointer">
      <v-btn v-for="(item, index) in navList" :key="index" class="nav-item rounded-0" depressed dark plain tile>
        {{item.name}}
      </v-btn>
    </nav>
    <div class="account flex flex-ai">
      <header-account />
    </div>
  </div>
</template>

<script>
import HeaderAccount from './headerAccount.vue'
export default {
  data() {
    return {
      navList: [
        {
          name: '探索',
          route: '',
        },
        {
          name: '新特性',
          route: '',
        },
        {
          name: '反馈',
          route: '',
        },
        {
          name: 'GitHub',
        },
      ],
    }
  },
  methods: {},
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
      // @include setTransition(all, 0.3s, ease);
      &:hover {
        // background-color: $deep-3;
      }
    }
  }
}
</style>
