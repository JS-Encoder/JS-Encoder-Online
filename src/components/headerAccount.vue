<template>
  <div id="headerAccount">
    <div class="not-login">
      <v-btn class="login-btn" depressed dark color="#1980ff">登录</v-btn>
      <v-btn class="sign-up-btn" depressed dark color="#272727">注册</v-btn>
    </div>
    <div class="is-login">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss" scoped>
#headerAccount {
  .not-login {
    .login-btn {
      margin-right: 15px;
    }
  }
}
</style>
