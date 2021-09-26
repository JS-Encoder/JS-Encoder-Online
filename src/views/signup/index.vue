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
            <v-col style="padding-bottom: 0" sm="8" cols="12">
              <v-text-field class="email-field" ref="emailField" label="邮箱" outlined color="primary"
                v-model="form.email" :rules="rules.email" :error-messages="errors.email">
                <template slot="append">
                  <v-btn class="send-email-btn" color="primary" absolute :disabled="!isEmailRight||emailOpts.sended"
                    @click.stop="sendAuthCode" :loading="emailOpts.authCodeLoading">{{emailOpts.emailText}}
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col class="auth-input" sm="4" cols="12">
              <v-text-field label="验证码" outlined color="primary" v-model="form.authCode" :disabled="!isEmailRight"
                :rules="rules.authCode" :error-messages="errors.authCode">
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field label="密码" outlined color="primary" hint="密码必须包含字母数字和下划线且长度为6-12" autocomplete="new-password"
            v-model="form.password" :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd" :rules="rules.password">
          </v-text-field>
          <v-text-field label="重复密码" outlined color="primary" autocomplete="new-password" v-model="form.rePassword"
            :append-icon="showRePwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showRePwd ? 'text' : 'password'"
            :rules="rules.rePassword" :disabled="!isPwdRight" @click:append="showRePwd = !showRePwd">
          </v-text-field>
          <v-btn block x-large color="primary" :loading="signUpLoading" @click="signUp">注册</v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import regexpList from '@utils/regexp'
export default {
  name: 'SignUp',
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
    async sendAuthCode() {
      this.$refs.emailField.blur()
      // 向邮箱发送验证码 emailAuthCode
      const emailOpts = this.emailOpts
      emailOpts.authCodeLoading = true
      try {
        const res = await this.$http.emailAuthCode({ email: this.form.email })
        if (res.state) {
          this.$message.success('验证码已发送！')
          emailOpts.sended = true
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
        }
      } catch (err) {
        console.log(err)
      }
      emailOpts.authCodeLoading = false
    },
    validate() {
      return this.$refs.signUpForm.validate()
    },
    async signUp() {
      if (this.validate()) {
        this.signUpLoading = true
        const {
          username,
          nickname: name,
          email,
          password,
          authCode: code,
        } = this.form
        try {
          const res = await this.$http.signUp({
            username,
            name,
            email,
            password,
            code,
          })
          const { state, msg } = res
          if (state) {
            this.$message.success('注册成功！')
            this.$router.replace('/login')
          } else {
            switch (msg) {
              case 0: {
                this.errors.authCode = ['验证码错误！']
                break
              }
              case 1: {
                this.$message.error('未知错误！')
                break
              }
              case 2: {
                this.errors.username = ['该用户名已被注册！']
                break
              }
              case 3: {
                this.errors.email = ['该邮箱已被注册！']
                break
              }
            }
          }
        } catch (err) {
          // this.$message.error('啊哦！服务器出了点问题😭')
        }
        this.signUpLoading = false
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.emailOpts.emailSendTimer)
  },
}
</script>

<style lang="scss" scoped>
#sign-up {
  padding: 50px 0 100px 0;
  .sign-up-content {
    .sign-up-form {
      margin-top: 40px;
      .email-field {
        ::v-deep input {
          padding-right: 110px;
        }
        .send-email-btn {
          height: 48px;
          top: 4px;
          right: 4px;
        }
      }
    }
  }
}
@include screenXS {
  #sign-up {
    padding: 50px 10px 100px 10px;
    .auth-input {
      padding-top: 0;
    }
  }
}
@include screenSM {
  #sign-up {
    padding: 50px 10px 100px 10px;
    .sign-up-content {
      width: 480px;
    }
  }
}
@include screenLG {
  #sign-up {
    min-height: calc(100vh - 70px);
    .sign-up-content {
      width: 480px;
    }
  }
}
</style>
