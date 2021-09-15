<template>
  <div id="forgetPwd" class="d-flex flex-jcc">
    <div class="forget-pwd-content">
      <div class="forget-pwd-title d-flex flex-clo">
        <span class="title-xl">忘记密码了？别担心！</span>
        <span class="text-sm text-describe">一封重置密码的确认邮件将被发送到你的邮箱</span>
      </div>
      <div class="forget-pwd-form">
        <v-form autocomplete="off" ref="form">
          <v-text-field label="邮箱" outlined color="primary" v-model="form.email" :rules="rules.email"></v-text-field>
          <v-btn block color="primary" :disabled="emailOpts.sended" x-large @click="sendEmail"
            :loading="emailOpts.authCodeLoading">{{emailOpts.emailText}}
          </v-btn>
        </v-form>
      </div>
      <div class="tip text-sm d-flex flex-clo">
        <span class="tip-title">没有收到邮件？</span>
        <span class="tip-content text-describe">也许是被放入垃圾邮件中了。</span>
      </div>
    </div>
  </div>
</template>

<script>
import regexpList from '@utils/regexp'
import cookie from '@utils/cookie'
export default {
  name: 'ForgetPwd',
  data() {
    return {
      form: {
        email: '',
      },
      emailOpts: {
        emailText: '重置密码',
        emailDelay: 59,
        emailSendTimer: null,
        sended: false,
        authCodeLoading: false,
      },
      rules: {
        email: [
          (v) => !!v || '请填写邮箱！',
          (v) => (v && regexpList.email.test(v)) || '邮箱格式错误！',
        ],
      },
      loading: false,
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
    async sendEmail() {
      if (!this.validate()) return void 0
      // 向邮箱发送重置密码验证链接 emailAuthLink
      const emailOpts = this.emailOpts
      emailOpts.authCodeLoading = true
      try {
        const { state, token } = await this.$http.emailAuthLink(this.form)
        if (state) {
          this.$message.success('邮件发送成功！')
          emailOpts.sended = true
          function calcEmailTime() {
            let delay = emailOpts.emailDelay
            emailOpts.emailText = `已发送（${delay}s）`
            if (--delay < 0) {
              clearInterval(emailOpts.emailSendTimer)
              Object.assign(emailOpts, {
                emailDelay: 60,
                emailSendTimer: null,
                emailText: '发送邮件',
                sended: false,
              })
            } else {
              emailOpts.emailDelay = delay
            }
          }
          calcEmailTime()
          emailOpts.emailSendTimer = setInterval(calcEmailTime, 1000)
        }
      } catch (err) {
        console.log(err)
      }
      emailOpts.authCodeLoading = false
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#forgetPwd {
  padding: 50px 0 100px 0;
  .forget-pwd-content {
    width: 480px;
    .forget-pwd-form {
      margin-top: 40px;
    }
    .tip {
      padding: 20px;
      margin-top: 50px;
      background-color: $deep-3;
      border-radius: 5px;
      .tip-title {
        margin-bottom: 10px;
      }
    }
  }
}
@include screenXS {
  #forgetPwd .forget-pwd-content {
    width: 350px;
  }
}
</style>
