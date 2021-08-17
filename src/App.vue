<template>
  <div id="app" :class="curViewBgc">
    <jse-header />
    <section>
      <router-view />
    </section>
    <jse-footer />
  </div>
</template>

<script>
import Header from '@components/header.vue'
import Footer from '@components/footer.vue'
export default {
  computed: {
    curViewBgc() {
      // 根据路由更换不同的背景
      const path = this.$route.path.replace('/', '')
      return `${path === '' ? 'home' : path}-bgc`
    },
  },
  components: {
    'jse-header': Header,
    'jse-footer': Footer,
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  color: $light-2;
  font-family: $font;
  background-color: $deep-5;
}
.home-bgc {
  background: radial-gradient(
    circle at 25px 25px,
    $primary-1 -25%,
    $deep-2 25%,
    $deep-5 55%
  );
}
</style>
