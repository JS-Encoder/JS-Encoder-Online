<template>
  <v-dialog id="modifyBindEmail" max-width="520" v-model="visible" @click:outside="close">
    <v-card>
      <v-card-title>
        <span class="title-sm">修改绑定邮箱</span>
      </v-card-title>
      <v-card-text>
        <v-form class="form d-flex flex-clo" ref="form">
          <v-row>
            <v-col style="padding-bottom: 0" sm="8" cols="12">
              <v-text-field class="email-field" ref="emailField" label="邮箱" placeholder="修改后的邮箱" outlined
                color="primary" v-model="form.email" :rules="rules.email">
                <template slot="append">
                  <v-btn color="primary" class="send-email-btn" absolute :disabled="!isEmailRight||emailOpts.sended"
                    :loading="emailOpts.authCodeLoading" @click.stop="sendAuthCode">{{emailOpts.emailText}}
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col class="auth-input" sm="4" cols="12">
              <v-text-field label="验证码" outlined color="primary" v-model="form.authCode" :disabled="!isEmailRight"
                :rules="rules.authCode">
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field label="密码" placeholder="当前账户密码" autocomplete="new-password" v-model="form.password"
            :rules="rules.password" :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'" @click:append="showPwd = !showPwd" outlined color="primary">
          </v-text-field>
          <v-btn color="primary" block x-large :loading="loading" @click="modify">修改邮箱</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import regexpList from '@utils/regexp'
import cookie from '@utils/cookie'
import localStore from '@utils/local-storage'
export default {
  data() {
    return {
      name: 'modifyBindEmail',
      showPwd: false,
      visible: false,
      form: {
        email: '',
        password: '',
        authCode: '',
      },
      rules: {
        email: [
          (v) => !!v || '请填写邮箱！',
          (v) => (v && this.isEmailRight) || '请填写正确的邮箱！',
        ],
        authCode: [(v) => !!v || '请填写验证码！'],
        password: [(v) => !!v || '请填写密码！'],
      },
      emailOpts: {
        emailText: '发送验证码',
        emailDelay: 59,
        emailSendTimer: null,
        sended: false,
        authCodeLoading: false,
      },
      loading: false,
    }
  },
  computed: {
    ...mapState(['visibleDialogName', 'curUserDetail']),
    isEmailRight() {
      return regexpList.email.test(this.form.email)
    },
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations([
      'setVisibleDialogName',
      'setCurUserDetail',
      'setLoginState',
      'setLoginInfo',
    ]),
    validate() {
      return this.$refs.form.validate()
    },
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
    async modify() {
      if (!this.validate()) return void 0
      this.loading = true
      try {
        const { password, authCode: code, email } = this.form
        const res = await this.$http.modifyBindEmail({
          username: this.curUserDetail.username,
          password,
          code,
          email,
        })
        if (res.state) {
          this.setCurUserDetail({ email: this.form.email })
          this.close()
          this.$http.logout().then((res) => {
            // 删除登录身份凭证
            cookie.del('AUTH_TOKEN')
            // 取消自动登录
            localStore.set('REMEMBER_ME', false)
            // 临时的第三方登录TMP_REMEMBER_ME
            sessionStorage.removeItem('TMP_REMEMBER_ME')
            this.setLoginState(false)
            this.setLoginInfo({
              username: '',
              nickname: '',
              avatar: '',
            })
            this.$message.success('邮箱修改成功，请重新登录！')
            this.$router.replace({ name: 'Login' }).catch((err) => {})
          })
        } else {
          this.$message.error('邮箱修改失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    close() {
      this.form = {
        email: '',
        password: '',
      }
      this.$refs.form.resetValidation()
      this.setVisibleDialogName('')
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 25px;
  .email-field {
    ::v-deep input {
      padding-right: 110px;
    }
    ::v-deep .send-email-btn {
      height: 48px;
      top: 4px;
      right: 4px;
    }
  }
}
@include screenXS {
  .auth-input {
    padding-top: 0;
  }
}
</style>
