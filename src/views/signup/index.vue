<template>
  <div id="sign-up" class="d-flex flex-jcc">
    <div class="sign-up-content">
      <div class="sign-up-title">
        <div class="title-up title-xl">
          <span>创建属于你的</span>
        </div>
        <div class="title-down title-xl text-right">
          <span class="text-bold text-primary">JS Encoder </span>
          <span>账户</span>
        </div>
      </div>
      <div class="sign-up-form">
        <v-form autocomplete="off" ref="signUpForm">
          <v-text-field label="用户名" outlined color="primary" hint="用户名只能包含字母和数字，长度小于15" v-model="form.username"
            :rules="rules.username" :error-messages="errors.username">
          </v-text-field>
          <v-text-field label="昵称" outlined color="primary" hint="昵称长度小于25" v-model="form.nickname"
            :rules="rules.nickname">
          </v-text-field>
          <v-row>
            <v-col md="8" sm="12">
              <v-text-field ref="emailField" label="邮箱" outlined color="primary" v-model="form.email"
                :rules="rules.email">
                <template slot="append">
                  <v-btn :disabled="!isEmailRight||emailOpts.sended" color="primary" class="send-email-btn"
                    @click.stop="sendAuthCode" absolute :loading="emailOpts.authCodeLoading">{{emailOpts.emailText}}
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="4" sm="12">
              <v-text-field label="验证码" :disabled="!isEmailRight" outlined color="primary" v-model="form.authCode"
                :rules="rules.authCode">
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field label="密码" autocomplete="new-password" :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd" outlined color="primary"
            hint="密码必须包含字母数字和下划线且长度为6-12" v-model="form.password" :rules="rules.password">
          </v-text-field>
          <v-text-field label="重复密码" autocomplete="new-password" :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showRePwd ? 'text' : 'password'" @click:append="showRePwd = !showRePwd" outlined color="primary"
            v-model="form.rePassword" :rules="rules.rePassword" :disabled="!isPwdRight">
          </v-text-field>
          <v-btn @click="signUp" block x-large color="primary" :loading="signUpLoading">注册</v-btn>
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
      emailOpts: {
        emailText: '发送验证码',
        emailDelay: 59,
        emailSendTimer: null,
        sended: false,
        authCodeLoading: false,
      },
      errors: {
        username: [],
        authCode: [],
        email: [],
      },
      rules: {
        username: [
          (v) => !!v || '请填写用户名！',
          (v) => (v && v.length <= 15) || '用户名长度不能大于15！',
          (v) =>
            (v && regexpList.letterOrNum.test(v)) ||
            '用户名只能包含字母和数字！',
        ],
        nickname: [
          (v) => !!v || '请填写昵称！',
          (v) => (v && v.length <= 25) || '昵称长度不能大于25！',
        ],
        email: [
          (v) => !!v || '请填写邮箱！',
          (v) => (v && this.isEmailRight) || '填写正确的邮箱以便发送验证码！',
        ],
        authCode: [(v) => !!v || '请填写验证码！'],
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
      form: {
        username: '',
        nickname: '',
        email: '',
        authCode: '',
        password: '',
        rePassword: '',
      },
      signUpLoading: false,
    }
  },
  computed: {
    isEmailRight() {
      return regexpList.email.test(this.form.email)
    },
    isPwdRight() {
      return regexpList.letterNumULine.test(this.form.password)
    },
  },
  watch: {
    'form.username'() {
      this.errors.username = []
    },
    'form.authCode'() {
      this.errors.authCode = []
    },
    'form.email'() {
      this.errors.email = []
    },
  },
  methods: {
    sendAuthCode() {
      this.$refs.emailField.blur()
      // 向邮箱发送验证码 emailAuthCode
      const emailOpts = this.emailOpts
      emailOpts.authCodeLoading = true
      setTimeout(() => {
        // 2072451919@qq.com
        emailOpts.sended = true
        emailOpts.authCodeLoading = false
        function calcEmailTime() {
          let delay = emailOpts.emailDelay
          emailOpts.emailText = `已发送（${delay}s）`
          if (--delay < 0) {
            clearInterval(emailOpts.emailSendTimer)
            Object.assign(emailOpts, {
              emailDelay: 60,
              emailSendTimer: null,
              emailText: '发送验证码',
              sended: false,
            })
          } else {
            emailOpts.emailDelay = delay
          }
        }
        calcEmailTime()
        emailOpts.emailSendTimer = setInterval(calcEmailTime, 1000)
      }, 3000)
    },
    validate() {
      return this.$refs.signUpForm.validate()
    },
    checkUsernameUnique(username) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false)
        }, 3000)
      }).then((res) => {
        return res
      })
    },
    async signUp() {
      if (this.validate()) {
        this.signUpLoading = true
        const form = this.form
        // 验证用户名是否已被注册 usernameUnique
        const usernameUnique = await this.checkUsernameUnique(form.username)
        if (!usernameUnique) {
          this.errors.username = ['该用户名已被注册！']
          this.signUpLoading = false
          return void 0
        }
        // 验证邮箱是否已被注册 emailUnique
        const emailUnique = await this.checkUsernameUnique(form.email)
        if (!emailUnique) {
          this.errors.email = ['邮箱已被注册！']
          this.signUpLoading = false
          return void 0
        }
        // 注册
        this.$store.dispatch('snackbar/openSnackbar', {
          msg: '注册成功！',
          color: 'success',
        })
        this.signUpLoading = false
      }
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#sign-up {
  .sign-up-content {
    .sign-up-form {
      .send-email-btn {
        height: 48px;
        top: 4px;
        right: 4px;
      }
    }
  }
}

@include screenLG {
  #sign-up {
    min-height: calc(100vh - 70px);
    padding: 50px 0 100px 0;
    .sign-up-content {
      width: 480px;
      .sign-up-form {
        margin-top: 40px;
      }
    }
  }
}
</style>
