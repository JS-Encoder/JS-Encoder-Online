<template>
  <div id="user" class="d-flex flex-clo flex-ai">
    <!-- http://localhost:8080/user/lliiooiill -->
    <div class="user-info-box d-flex flex-clo flex-ai">
      <v-avatar size="100" class="avatar" color="primary">
        <span class="white--text text-h4">li</span>
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img> -->
        <router-link to="/settings">
          <v-btn fab class="edit-btn" x-small title="设置">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </v-avatar>
      <div class="info-text d-flex flex-1 flex-clo flex-ai">
        <span class="nickname text-bold title-md">lliiooiill</span>
        <span class="username text-md">@longgererer</span>
        <p class="about text-describe text-sm">
          这是我的个人这是我的个人这是我的个人这是我的个人这是我的个人简介这是我的个人简介这是我的个人简介这是我的个人简介这是我的个人简介这是我的个人简介这是我的个人简介</p>
      </div>
      <div class="other-info d-flex flex-jcb flex-w text-md">
        <v-spacer></v-spacer>
        <div class="email-info text-sm">
          <v-icon class="icon" small>mdi-email-outline</v-icon>
          <span>2072451919@qq.com</span>
        </div>
      </div>
    </div>
    <div class="user-views">
      <v-row class="user-tabs" no-gutters justify="center">
        <v-col md="7" sm="8" cols="12">
          <v-tabs class="tab-list" v-model="curTabName" center-active show-arrows grow>
            <v-tab class="tab" v-for="item in tabList" :key="item.route" @click="switchTabs(item)"
              :href="`#${item.route}`">
              <span class="text-md">{{item.name}}</span>
              <div class="item-num text-xs">{{item.num}}</div>
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="2" class="col-space"></v-col>
        <v-col md="2" sm="3" cols="11" class="d-flex flex-ai" v-show="showSort">
          <span class="flex-sh sort-title" v-show="showSort">排序：</span>
          <v-select :items="sortList" solo :menu-props="{ offsetY: true }" v-model="sortBy" hide-details
            v-show="showSort">
          </v-select>
        </v-col>
        <!-- <v-col cols="1" class="col-space"></v-col> -->
        <v-col md="1" sm="1" cols="1" class="d-flex flex-ai" v-show="isSelfWorks">
          <v-spacer></v-spacer>
          <v-tooltip bottom color="info">
            <template v-slot:activator="{ on, attrs }">
              <router-link to="/newWork">
                <v-btn small color="primary" fab v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </router-link>
            </template>
            <span>新建实例</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        {
          name: '实例',
          route: 'Works',
          num: 12,
        },
        {
          name: '喜爱',
          route: 'Liked',
          num: 12,
        },
        {
          name: '关注',
          route: 'Following',
          num: 9,
        },
        {
          name: '粉丝',
          route: 'Followers',
          num: 12,
        },
        {
          name: '回收站',
          route: 'CycleBin',
          num: 12,
        },
      ],
      sortList: ['喜爱度', '更新日期', '创建时间'],
      sortBy: '更新日期',
      showSort: true,
      userInfo: {
        bgc: '#1980ff'
      }
    }
  },
  computed: {
    curTabName: {
      get() {
        return this.$route.name
      },
      set(val) {
        return val
      },
    },
    isSelfWorks() {
      return this.curTabName !== 'Works'
    },
  },
  watch: {
    curTabName(name) {
      this.showSort = ['Works', 'Liked'].includes(name)
    },
  },
  methods: {
    switchTabs(item) {
      this.$router.push({ name: item.route }).catch((err) => err)
    },
  },
  components: {},
}
</script>

<style lang="scss">
#user {
  .v-item-group {
    background-color: $deep-3 !important;
  }
}
</style>
<style lang="scss" scoped>
#user {
  padding: 0 35px;
  .user-info-box {
    width: 100%;
    min-height: 300px;
    position: relative;
    .avatar {
      margin-top: 50px;
      position: relative;
      overflow: visible;
      .edit-btn {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    .info-text {
      width: 100%;
      .nickname {
        margin-top: 15px;
      }
      .username {
        color: $light-4;
      }
      .about {
        margin-top: 10px;
      }
    }
    .other-info {
      width: 100%;
      color: $light-5;
      .email-info {
        span {
          vertical-align: bottom;
        }
        .icon {
          color: inherit;
          margin-right: 5px;
        }
      }
    }
  }
  .user-views {
    width: 100%;
    margin-top: 50px;
    .user-tabs {
      .tab-list {
        background-color: $deep-3;
        .tab {
          padding: 0 20px;
          .item-num {
            padding: 2px 5px;
            margin-left: 10px;
            color: inherit;
            border-radius: 5px;
            background-color: $deep-2;
          }
        }
        .v-tab--active {
          color: $light-2;
          background-color: $deep-5;
          .item-num {
            color: inherit;
          }
        }
      }
    }
  }
}

@include Mobile {
  #user {
    padding: 0 10px;
    .user-info-box {
      min-height: 350px;
    }
    .user-views {
      .user-tabs {
        position: -webkit-sticky;
        position: sticky;
        z-index: 10;
        top: 0;
        background-color: $deep-5;
        box-shadow: 0 2px 4px $deep-5;
        .tab-list {
          .tab {
            padding: 0;
            .item-num {
              display: none;
            }
          }
        }
        .sort-title {
          display: none;
        }
      }
    }
    .col-space {
      display: none;
    }
  }
}

@include PC {
  #user {
    .user-info-box {
      .about {
        max-width: 40%;
      }
    }
  }
}
</style>
