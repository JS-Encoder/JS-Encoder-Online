<template>
  <div class="follow-card">
    <v-avatar class="avatar">
      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
    </v-avatar>
    <div class="follow-user-info">
      <div class="d-flex flex-ai">
        <span class="text-bold text-md">Tom Rich</span>
        <v-spacer></v-spacer>
        <v-btn small color="#333333" depressed v-if="following">取消关注</v-btn>
        <v-btn small color="primary" depressed v-else>关注</v-btn>
      </div>
      <span class="about text-describe text-sm">这是他的个人简介...这是他的个人简介...这是他的个人简介...</span>
      <div class="text-sm num">
        <span class="instances">实例: 123</span>
        <span class="follower">粉丝: 456</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    following: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss" scoped>
.follow-card {
  padding: 25px 0 0 25px;
  position: relative;
  .avatar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .follow-user-info {
    height: 130px;
    padding: 15px 25px;
    border-radius: 10px;
    background: linear-gradient(to right, $deep-2, $deep-4);
    .about {
      margin-top: 5px;
      display: block;
      @include texts-ellipsis(2);
    }
    .num {
      color: $light-4;
      margin-top: 5px;
      .instances {
        margin-right: 30px;
      }
    }
  }
}
</style>
