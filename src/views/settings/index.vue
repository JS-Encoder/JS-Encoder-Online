<template>
  <div id="settings" class="d-flex">
    <v-row no-gutters justify="center" class="head-tabs">
      <v-col cols="12">
        <v-tabs class="tab-list" v-model="curRouteName" center-active show-arrows grow>
          <v-tab class="tab" v-for="item in menuList" :key="item.name" @click="switchItem(item.name)"
            :href="`#${item.name}`">
            <span class="text-md">{{item.text}}</span>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
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
      <router-view class="content-view" v-if="true"></router-view>
      <div v-else class="content-view">
        <v-skeleton-loader type="article@5"></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      menuList: [
        {
          text: '个人设置',
          name: 'Profile',
          icon: 'mdi-account-edit-outline',
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
      isUserInfoGot: false,
    }
  },
  created() {
    this.curRouteName = this.$route.name
    // 先清空
    this.clearCurUserDetail()
    this.getUserInfo()
  },
  computed: {
    ...mapState(['loginInfo']),
  },
  methods: {
    ...mapMutations(['setCurUserDetail', 'clearCurUserDetail']),
    async getUserInfo() {
      try {
        const res = await this.$http.getUserInfo({
          username: this.loginInfo.username,
        })
        const {
          name: nickname,
          contactEmail,
          userPicture: avatar,
          description: about,
          email,
          username,
          giteeId,
          githubId,
        } = res.data
        this.setCurUserDetail({
          nickname,
          email,
          contactEmail,
          avatar,
          about,
          username,
          giteeId,
          githubId,
        })
      } catch (err) {
        this.$message.error('获取用户信息失败!')
      }
    },
    switchItem(name) {
      this.curRouteName = name
      this.$router.push({ name })
    },
  },
  components: {},
}
</script>

<style lang="scss">
.head-tabs {
  .v-item-group {
    background-color: $deep-5 !important;
  }
}
</style>
<style lang="scss" scoped>
#settings {
  min-height: 100%;
  .head-tabs,
  .side-menu {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .head-tabs {
    display: none;
    z-index: 2;
    box-shadow: 0 2px 4px $deep-5;
  }
  .side-menu {
    padding-top: 50px;
    align-self: flex-start;
    .menu-list-item {
      box-sizing: border-box;
      color: $light-6;
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
@include PC {
  #settings {
    .side-menu {
      width: 350px;
      height: 350px;
      .menu-card {
        width: 220px;
        margin-top: 25px;
        .menu-list {
          padding: 30px 0;
          .menu-list-item {
            padding: 0 40px;
            &:not(:first-child) {
              margin-top: 10px;
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
@include screenXS {
  #settings {
    flex-direction: column;
    .head-tabs {
      display: block;
      .tab-list {
        background-color: $deep-6 !important;
      }
    }
    .side-menu {
      display: none !important;
    }
    .settings-content {
      margin-top: 50px;
    }
  }
}
@include screenSM {
  #settings {
    .side-menu {
      width: 150px;
    }
    .settings-content {
      margin-top: 50px;
    }
  }
}
</style>
