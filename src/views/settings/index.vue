<template>
  <div id="settings" class="d-flex">
    <div class="side-menu d-flex flex-clo flex-end">
      <span class="menu-title title-lg">设置</span>
      <v-card color="info" class="menu-card" rounded="lg">
        <v-list class="menu-list">
          <v-list-item-group :value="curRouteName" color="info">
            <v-list-item v-for="item in menuList" :key="item.name" class="menu-list-item"
              active-class="menu-list-item-active" :value="item.name" @click="switchItem(item.name)">
              <v-list-item-icon>
                <v-icon class="icon">{{item.icon}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{item.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <div class="settings-content d-flex flex-1 flex-jcc">
      <router-view class="content-view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          text: '个人设置',
          name: 'Profile',
          icon: 'mdi-face',
        },
        {
          text: '编码设置',
          name: 'Code',
          icon: 'mdi-code-tags',
        },
        {
          text: '账户设置',
          name: 'Account',
          icon: 'mdi-shield-account-outline',
        },
      ],
      curRouteName: 'Profile',
    }
  },
  created() {
    this.curRouteName = this.$route.name
  },
  methods: {
    switchItem(name) {
      this.curRouteName = name
      this.$router.push({ name })
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#settings {
  .side-menu {
    padding-top: 50px;
  }
}
@include screenLG {
  #settings {
    min-height: 100%;
    .side-menu {
      width: 350px;
      height: 350px;
      position: -webkit-sticky;
      position: sticky;
      top: 0px;
      align-self: flex-start;
      .menu-card {
        width: 220px;
        margin-top: 25px;
        .menu-list {
          padding: 30px 0;
          .menu-list-item {
            padding: 0 40px;
            box-sizing: border-box;
            color: $light-6;
            &:not(:first-child) {
              margin-top: 10px;
            }
            .icon {
              color: inherit;
            }
          }
          .menu-list-item-active {
            border-right: 2px solid $primary-1;
            color: $light-1;
            &:before {
              background-color: $deep-1;
            }
          }
        }
      }
    }
    .settings-content {
      margin-top: 115px;
      .content-view {
        width: 450px;
        margin-right: 100px;
      }
    }
  }
}
</style>
