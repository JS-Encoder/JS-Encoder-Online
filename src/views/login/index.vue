<template>
  <div id="login" class="d-flex flex-jcc">
    <div class="login-content">
      <div class="login-title title-xl">
        <span>登录 </span>
        <span class="text-primary text-bold">JS Encoder</span>
      </div>
      <div class="login-form">
        <v-form autocomplete="off" ref="loginForm">
          <v-text-field label="用户名或邮箱" outlined color="primary" v-model="form.usernameOrEmail"
            :rules="rules.usernameOrEmail" autocomplete="off"></v-text-field>
          <v-text-field label="密码" autocomplete="new-password" outlined color="primary"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showPwd ? 'text' : 'password'"
            @click:append="showPwd = !showPwd" v-model="form.password" :rules="rules.password"></v-text-field>
          <v-btn @click="login" block x-large color="primary" :loading="loginLoading">登录</v-btn>
        </v-form>
        <div class="forget-pwd text-right">
          <router-link to="/forgetPwd">
            <span class="text-sm">忘记密码了？</span>
          </router-link>
        </div>
        <v-divider class="divider"></v-divider>
        <div class="third-part-btn d-flex flex-jcc">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon x-large v-bind="attrs" v-on="on" class="btn-github">
                <i class="icon iconfont icon-github title-lg"></i>
              </v-btn>
            </template>
            <span>使用 GitHub 登录</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon x-large v-bind="attrs" v-on="on" class="btn-gitee">
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
export default {
  data() {
    return {
      showPwd: false,
      form: {
        usernameOrEmail: '',
        password: '',
      },
      rules: {
        usernameOrEmail: [(v) => !!v || '请填写用户名或邮箱！'],
        password: [(v) => !!v || '请填写密码！'],
      },
      loginLoading: false,
    }
  },
  methods: {
    validate() {
      return this.$refs.loginForm.validate()
    },
    login() {
      if (this.validate()) {
        this.loginLoading = true
        this.loginLoading = false
      }
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#login {
  .login-content {
    .login-form {
      .forget-pwd {
        color: $light-6;
      }
    }
  }
}

@include screenLG {
  #login {
    // min-height: calc(100vh - 70px);
    padding: 50px 0 100px 0;
    .login-content {
      width: 480px;
      .login-form {
        margin-top: 40px;
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
}
</style>
