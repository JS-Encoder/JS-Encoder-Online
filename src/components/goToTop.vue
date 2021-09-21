<template>
  <transition name="fade">
    <v-btn class="goTop" color="primary" fab small dark v-show="backTopShow" @click="$vuetify.goTo(0, 'duration')">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </transition>
</template>

<script>
export default {
  data() {
    return { backTopShow: false }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.backTopShow =
        document.documentElement.scrollTop + document.body.scrollTop > 500
    },
  },
}
</script>

<style lang="scss" scoped>
.goTop {
  position: fixed;
  z-index: 5;
  right: 50px;
  bottom: 15%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@include screenXS {
  .goTop {
    right: 10px;
  }
}
</style>
