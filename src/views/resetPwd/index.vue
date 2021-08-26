<template>
  <div id="resetPwd" class="d-flex flex-jcc">
    <div class="reset-pwd-content">
      <div class="reset-pwd-title d-flex flex-clo">
        <span class="title-xl">重置密码</span>
        <span class="text-sm text-describe">重置成功后将返回登录页面</span>
      </div>
      <div class="reset-pwd-form">
        <v-form autocomplete="off" ref="form">
          <v-text-field label="密码" autocomplete="new-password" :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd" outlined color="primary"
            hint="密码必须包含字母数字和下划线且长度为6-12" v-model="form.password" :rules="rules.password">
          </v-text-field>
          <v-text-field label="重复密码" autocomplete="new-password" :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showRePwd ? 'text' : 'password'" @click:append="showRePwd = !showRePwd" outlined color="primary"
            v-model="form.rePassword" :rules="rules.rePassword" :disabled="!isPwdRight">
          </v-text-field>
          <v-btn block color="primary" x-large :loading="loading" @click="reset">重置密码</v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import regexpList from '@utils/regexp'
export default {
  data() {
    return {
      showPwd: false,
      showRePwd: false,
      loading: false,
      form: {
        password: '',
        rePassword: '',
      },
      rules: {
        password: [
          (v) => !!v || '请填写密码！',
          (v) =>
            (v && v.length >= 6 && v.length <= 12) || '密码长度必须在6-12间！',
          (v) => (v && this.isPwdRight) || '密码必须包含字母和数字和下划线！',
        ],
        rePassword: [
          (v) => !!v || '请确认密码！',
          (v) => (v && v === this.form.password) || '两次密码不一致！',
        ],
      },
    }
  },
  computed: {
    isPwdRight() {
      return regexpList.letterNumULine.test(this.form.password)
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      if (this.validate()) {
        // 重置密码 resetPwd
        this.loading = true
        this.loading = false
        this.$store.dispatch('snackbar/openSnackbar', {
          msg: '密码重置成功！',
          color: 'success',
        })
        setTimeout(() => {
          this.$router.replace({
            path: '/login',
          })
        }, 2500)
      }
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#resetPwd {
  padding: 50px 0 100px 0;
  .reset-pwd-content {
    width: 480px;
    .reset-pwd-form {
      margin-top: 40px;
    }
  }
}
@include screenXS {
  #resetPwd {
    .reset-pwd-content {
      width: 350px;
    }
  }
}
</style>
