<template>
  <v-dialog id="loginVerify" max-width="500" v-model="visible" persistent>
    <v-card>
      <v-card-title class="info">
        <span class="title-md">第三方登陆确认</span>
      </v-card-title>
      <v-card-text>
        <div class="content">
          <span class="title-xs">您是否已经注册了 JS Encoder 账户？</span>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="toLogin">有，去登录</v-btn>
        <v-btn color="primary" @click="toSignUp">没有，去注册</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      name: 'loginVerify',
      visible: false,
    }
  },
  created() {
    this.visible = this.name === this.visibleDialogName
  },
  computed: {
    ...mapState(['visibleDialogName']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
    toLogin() {
      this.$router.push({ name: 'Login' })
      this.closeDialog()
    },
    toSignUp() {
      this.$router.push({ name: 'Signup' })
      this.closeDialog()
    },
    closeDialog() {
      this.setVisibleDialogName('')
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
}
</style>
