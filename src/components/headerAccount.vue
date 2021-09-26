<template>
  <div id="headerAccount">
    <div class="is-login pointer" v-if="loginState">
      <v-menu transition="slide-y-transition" bottom offset-y right>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar class="avatar" v-bind="attrs" v-on="on" :size="dense?30:40" :color="loginInfo.avatar?'':'primary'">
            <v-img v-if="loginInfo.avatar" :src="qiNiuImgLink+loginInfo.avatar"></v-img>
            <span class="white--text text-h7" v-else>{{loginInfo.nickname|preNickname}}</span>
          </v-avatar>
        </template>
        <v-list class="user-menu">
          <v-list-item class="user-menu-list" link v-for="item in menuList" :key="item.value"
            @click="handleMenu(item.value)">
            <v-icon class="icon">{{item.icon}}</v-icon>
            {{item.name}}
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="not-login" v-else>
      <router-link to="/login">
        <v-btn class="login-btn" depressed color="primary" :small="dense" :class="dense?'radius-2':''">登录
        </v-btn>
      </router-link>
      <router-link to="/signup">
        <v-btn class="sign-up-btn" depressed color="info" :small="dense" :class="dense?'radius-2':''">注册
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import localStore from '@utils/local-storage'
import { qiNiuImgLink } from '@utils/publicData'
import cookie from '@utils/cookie'
export default {
  props: {
    dense: {
      type: Boolean,
      default: false,
    },
  },
  inject: ['changeRouterKey'],
  data() {
    return {
      qiNiuImgLink,
      menuList: Object.freeze([
        {
          name: '我的',
          value: 'user',
          icon: 'mdi-account-outline',
        },
        {
          name: '新建实例',
          value: 'newWork',
          icon: 'mdi-plus-circle-outline',
        },
        {
          name: '设置',
          value: 'settings',
          icon: 'mdi-cog-outline',
        },
        {
          name: '退出登录',
          value: 'logout',
          icon: 'mdi-logout-variant',
        },
      ]),
    }
  },
  computed: {
    ...mapState(['loginState', 'loginInfo']),
  },
  methods: {
    ...mapMutations(['setLoginInfo', 'setLoginState', 'resetInstanceState']),
    handleMenu(val) {
      switch (val) {
        case 'user': {
          this.$router
            .push(`/user/${this.loginInfo.username}`)
            .catch((err) => {})
          break
        }
        case 'newWork': {
          /**
           * 在新建实例或实例详情页面点击新建实例
           * 需要触发App的changeRouterKey方法改变key强制刷新路由
           * 并且需要清除iframe的绑定和实例部分配置
           */
          switch (this.$route.name) {
            case 'NewWork': {
              this.$router.push({ name: 'NewWork' }).catch((err) => {
                this.changeRouterKey()
              })
              break
            }
            case 'Work': {
              this.$router.push({ name: 'NewWork' }).then(() => {
                this.changeRouterKey()
              })
              break
            }
            default: {
              this.$router.push({ name: 'NewWork' }).catch((err) => {})
            }
          }
          break
        }
        case 'settings': {
          this.$router.push({ name: 'Settings' }).catch((err) => {})
          break
        }
        case 'logout': {
          this.$alert({
            content: '登出之后，下次来只能手动登录哦！',
            okColor: 'error',
            okText: '登出',
          }).then((isLogout) => {
            if (!isLogout) return void 0
            console.log(isLogout)
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
            this.$http.logout().then((res) => {
              this.$router.replace({ name: 'Home' }).catch((err) => {})
            })
          })
        }
      }
    },
  },
}
</script>

<style lang="scss">
.user-menu {
  .user-menu-list {
    color: $light-5 !important;
    @include setTransition(color, 0.3s, ease);
    &:hover {
      color: $light-1 !important;
    }
    .icon {
      color: inherit;
      margin-right: 15px;
    }
  }
}
</style>
<style lang="scss" scoped>
#headerAccount {
  .is-login {
    .avatar {
      &:hover {
        border: 2px solid $primary-1;
      }
    }
  }
  .not-login {
    .login-btn {
      margin-right: 15px;
    }
  }
}

@include screenXS {
  #headerAccount {
    .not-login {
      .login-btn {
        margin-right: 5px;
      }
      .login-btn,
      .sign-up-btn {
        height: 35px;
      }
    }
  }
}
</style>
