<template>
  <div id="notFound" class="d-flex flex-jcc">
    <div class="not-found-content d-flex flex-clo flex-ai">
      <img class="not-found-img" src="http://picstore.lliiooiill.cn/404.svg" alt="">
      <span class="title-xl">哦。。。页面哪儿去了？</span>
      <v-btn dark color="primary" class="go-home-btn" href="/">返回首页</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss" scoped>
#notFound {
  .not-found-content {
    .go-home-btn {
      margin-top: 25px;
      width: 250px;
    }
  }
}

@include screenLG {
  #notFound {
    min-height: calc(100vh - 70px);
    .not-found-content {
      width: 40%;
      .not-found-img {
        width: 100%;
      }
    }
  }
}
</style>
