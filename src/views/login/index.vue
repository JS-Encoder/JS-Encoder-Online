<template>
  <div id="login" class="d-flex flex-jcc">
    <div class="login-content">
      <div class="login-title title-xl">
        <span>登录 </span>
        <span class="text-primary text-bold">JS Encoder</span>
      </div>
      <div class="login-form">
        <v-form autocomplete="off" ref="loginForm">
          <v-text-field label="用户名或邮箱" outlined color="primary" v-model="form.username" :rules="rules.username"
            autocomplete="off"></v-text-field>
          <v-text-field label="密码" autocomplete="new-password" outlined color="primary" v-model="form.password"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showPwd ? 'text' : 'password'"
            :rules="rules.password" @click:append="showPwd = !showPwd"></v-text-field>
          <v-btn color="primary" block x-large :loading="loginLoading" @click="login">登录</v-btn>
        </v-form>
        <div class="forget-pwd text-right">
          <router-link to="/forgetPwd">
            <span class="text-sm">忘记密码了？</span>
          </router-link>
        </div>
        <v-divider class="divider"></v-divider>
        <div class="third-part-btn d-flex flex-jcc">
          <v-tooltip top disabled>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="btn-github" icon x-large v-bind="attrs" v-on="on" @click="loginWithGitHub" disabled>
                <i class="icon iconfont icon-github title-lg"></i>
              </v-btn>
            </template>
            <span>使用 GitHub 登录</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="btn-gitee" icon x-large v-bind="attrs" v-on="on" @click="loginWithGitee">
                <i class="icon iconfont icon-gitee title-lg"></i>
              </v-btn>
            </template>
            <span>使用 Gitee 登录</span>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localStore from '@utils/local-storage'
import { mapState, mapMutations } from 'vuex'
import { randomCSRFToken } from '@utils/tools'
import cookie from '@utils/cookie'
import oauthCONFIG from '@utils/oauthConfig'
import baseUrl from '@service/env'
import qs from 'qs'
export default {
  name: 'Login',
  data() {
    return {
      showPwd: false,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [(v) => !!v || '请填写用户名或邮箱！'],
        password: [(v) => !!v || '请填写密码！'],
      },
      loginLoading: false,
    }
  },
  methods: {
    ...mapMutations(['setLoginInfo', 'setLoginState']),
    validate() {
      return this.$refs.loginForm.validate()
    },
    login() {
      if (!this.validate()) void 0
      this.loginLoading = true
      // 获取第三方登录token
      const tmpToken = sessionStorage.getItem('TMP_OAUTH_TOKEN')
      const config = tmpToken ? { headers: { token: tmpToken } } : {}
      this.$http
        .login({ ...this.form, rememberMe: true }, config)
        .then((res) => {
          if (res.state) {
            const { data, token, msg } = res
            // 存储请求权限凭证
            cookie.set('AUTH_TOKEN', token, Infinity, {
              secure: true,
              sameSite: 'Lax',
            })
            // 自动登录
            localStore.set('REMEMBER_ME', true)
            // 存储用户信息到VueX
            const { username, name: nickname, userPicture: avatar } = data
            this.setLoginState(true)
            this.setLoginInfo({
              username,
              nickname,
              avatar,
            })
            switch (msg) {
              case 1: {
                this.$message.error('绑定第三方账户失败，该账户已被绑定！')
                break
              }
              case 2: {
                // 临时的第三方登录TMP_REMEMBER_ME
                sessionStorage.setItem('TMP_REMEMBER_ME', true)
                this.$message.success('绑定成功！')
                break
              }
            }
            this.$message.success('登录成功！')
            this.$router.replace(`/user/${username}`)
          } else {
            this.$message.error('登录失败，用户名/邮箱或密码错误！')
          }
          this.loginLoading = false
        })
        .catch((err) => {
          console.log(err)
          this.loginLoading = false
        })
    },
    loginWithGitHub() {},
    loginWithGitee() {
      const csrfT = randomCSRFToken()
      const requireStr = qs.stringify({
        client_id: oauthCONFIG.gitee.clientID,
        redirect_uri: `${baseUrl.client}/?type=gitee`,
        response_type: 'code',
        state: csrfT,
      })
      cookie.set('CSRF_TOKEN', csrfT, 60 * 10)
      window.open(
        `https://gitee.com/oauth/authorize?${requireStr}scope=user_info`,
        '_self'
      )
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#login {
  min-height: calc(100vh - 70px);
  padding: 50px 0 100px 0;
  .login-content {
    width: 480px;
    .login-form {
      margin-top: 40px;
      .forget-pwd {
        color: $light-6;
      }
      .divider {
        margin: 30px 0;
        position: relative;
        &::after {
          content: '或';
          padding: 5px;
          color: $light-7;
          font-size: 12px;
          background-color: $deep-5;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .third-part-btn {
        .btn-github {
          margin-right: 15px;
          &:hover {
            color: #000000;
          }
        }
        .btn-gitee {
          &:hover {
            color: $red-1;
          }
        }
      }
    }
  }
}

@include screenXS {
  #login .login-content {
    width: 350px;
  }
}
</style>
