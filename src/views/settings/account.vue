<template>
  <div id="account">
    <div class="account-item account-third d-flex flex-clo">
      <span class="item-title title-xs">第三方账户</span>
      <span class="text-sm text-describe">绑定第三方账户，你就可以通过第三方账户进行快捷登陆。</span>
      <div class="item-content">
        <div class="d-flex flex-ai third-list">
          <i class="icon iconfont icon-github title-lg"></i>
          <span>GitHub</span>
          <v-spacer></v-spacer>
          <v-btn text color="primary">绑定账户</v-btn>
        </div>
        <div class="d-flex flex-ai third-list">
          <i class="icon iconfont icon-gitee title-lg"></i>
          <span>Gitee</span>
          <v-spacer></v-spacer>
          <v-btn text color="error">解除绑定</v-btn>
        </div>
      </div>
    </div>
    <div class="account-item account-email d-flex flex-clo">
      <span class="item-title title-xs">绑定邮箱</span>
      <span class="text-sm text-describe">修改绑定的邮箱，该邮箱用于找回密码及其他操作。</span>
      <div class="item-content">
        <v-row>
          <v-col cols="8">
            <v-text-field solo label="输入修改后的邮箱"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" height="48" block x-large>修改</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="account-item account-delete d-flex flex-clo">
      <span class="item-title title-xs">删除账户</span>
      <span class="text-sm text-describe">请注意！这样会删除你的账户和里面的所有信息，该操作无法恢复！</span>
      <div class="item-content">
        <v-btn color="error" class="col-6" x-large>删除账户</v-btn>
      </div>
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
#account {
  .account-item {
    margin-bottom: 15px;
    .item-title {
      margin-bottom: 10px;
    }
    .item-content {
      margin-top: 25px;
    }
  }
  .account-third {
    .third-list {
      margin-bottom: 15px;
      .icon {
        margin-right: 25px;
      }
    }
  }
}
</style>
