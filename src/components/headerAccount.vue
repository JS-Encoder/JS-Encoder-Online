<template>
  <div id="headerAccount">
    <div class="is-login pointer" v-if="isLogin">
      <v-menu transition="slide-y-transition" bottom offset-y right>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="40" class="avatar" v-bind="attrs" v-on="on">
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-avatar>
        </template>
        <v-list class="user-menu">
          <v-list-item v-for="item in menuList" :key="item.value" class="user-menu-list" link
            @click="handleMenu(item.value)">
            <v-icon class="icon">{{item.icon}}</v-icon>
            {{item.name}}
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="not-login" v-else>
      <v-btn class="login-btn" depressed color="primary" href="/login">登录</v-btn>
      <v-btn class="sign-up-btn" depressed color="info" href="/signup">注册</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      menuList: [
        {
          name: '我的',
          value: 'user',
          icon: 'mdi-account-outline',
        },
        {
          name: '设置',
          value: 'setting',
          icon: 'mdi-cog-outline',
        },
        {
          name: '退出登录',
          value: 'logout',
          icon: 'mdi-logout-variant',
        },
      ],
    }
  },
  methods: {
    handleMenu(val) {
      switch (val) {
        case 'user': {
          this.$router.push({
            name: 'User',
            params: {
              id: 'lliiooiill',
            },
          })
          break
        }
        case 'setting': {
          break
        }
        case 'logout':
      }
    },
  },
  components: {},
}
</script>

<style lang="scss">
.user-menu {
  .user-menu-list {
    color: $light-5 !important;
    @include setTransition(color, 0.3s, ease);
    .icon {
      color: inherit;
      margin-right: 15px;
    }
    &:hover {
      color: $light-1 !important;
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
</style>
