<template>
  <div id="user" class="d-flex flex-clo flex-ai">
    <div class="user-info-box d-flex flex-clo flex-ai">
      <v-avatar size="100" class="avatar" color="primary">
        <v-img :src="qiNiuImgLink+curUserDetail.avatar" v-if="curUserDetail.avatar"></v-img>
        <span class="white--text text-h4" v-else>{{curUserDetail.nickname|preNickname}}</span>
        <router-link to="/settings" v-if="isSelf">
          <v-btn fab class="edit-btn" x-small title="设置">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </router-link>
        <v-btn fab class="edit-btn" x-small title="取消关注" v-else-if="isMyFollow" color="#777777">
          <v-icon>mdi-account-remove</v-icon>
        </v-btn>
        <v-btn fab class="edit-btn" x-small title="关注" v-else color="primary">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </v-avatar>
      <div class="info-text d-flex flex-1 flex-clo flex-ai">
        <span class="nickname text-bold title-md">{{curUserDetail.nickname}}</span>
        <span class="username text-md">@{{curUserDetail.username}}</span>
        <p class="about text-describe text-sm">{{curUserDetail.about}}</p>
      </div>
      <div class="other-info d-flex flex-jcb flex-w text-md">
        <v-spacer></v-spacer>
        <div class="email-info text-sm" v-if="curUserDetail.contactEmail">
          <v-icon class="icon" small>mdi-email-outline</v-icon>
          <span>{{curUserDetail.contactEmail}}</span>
        </div>
      </div>
    </div>
    <div class="user-views" v-show="showTabItems">
      <v-row class="user-tabs" no-gutters justify="center">
        <v-col md="7" sm="8" cols="12">
          <v-tabs class="tab-list" v-model="curTabName" center-active show-arrows grow>
            <v-tab class="tab" v-for="item in tabList" :key="item.route" @click="switchTabs(item)"
              :href="`#${item.route}`">
              <span class="text-md">{{item.name}}</span>
              <div class="item-num text-xs">{{num[item.path]}}</div>
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
        <router-view v-show="showTabItems"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { qiNiuImgLink } from '@utils/publicData'
export default {
  data() {
    return {
      qiNiuImgLink,
      tabList: [
        {
          name: '实例',
          route: 'Works',
          path: 'works',
        },
        {
          name: '喜爱',
          route: 'Liked',
          path: 'liked',
        },
        {
          name: '关注',
          route: 'Following',
          path: 'following',
        },
        {
          name: '粉丝',
          route: 'Followers',
          path: 'followers',
        },
      ],
      num: {
        works: 0,
        liked: 0,
        following: 0,
        followers: 0,
        cycleBin: 0,
      },
      sortList: ['喜爱度', '更新日期', '创建时间'],
      sortBy: '更新日期',
      showSort: true,
      showTabItems: false,
    }
  },
  async created() {
    await this.getUserInfo()
    if (this.isSelf) {
      this.tabList.push({
        name: '回收站',
        route: 'CycleBin',
        path: 'cycleBin',
      })
    }
    const {
      works,
      liked,
      followers,
      following,
      recycle: cycleBin,
    } = this.curUserDetail
    this.num = { works, liked, followers, following, cycleBin }
    this.showTabItems = true
  },
  computed: {
    ...mapState(['loginInfo', 'curUserDetail']),
    curTabName: {
      get() {
        return this.$route.name
      },
      set(val) {
        return val
      },
    },
    isSelf() {
      // 是不是自己的页面
      return this.loginInfo.username === this.curUserDetail.username
    },
    isMyFollow() {
      return this.curUserDetail.myFollow
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
    ...mapMutations(['setCurUserDetail', 'clearCurUserDetail']),
    switchTabs(item) {
      this.$router.push({ name: item.route }).catch((err) => err)
    },
    async getUserInfo() {
      // 获取当前用户个人信息
      const username = this.$route.params.id
      await this.$http
        .getUserInfo({ username })
        .then(({ data }) => {
          if (data) {
            const {
              name: nickname,
              userPicture: avatar,
              description: about,
              favorites: liked,
              backgroundColor: bgc,
              fan: followers,
              contactEmail,
              email,
              username,
              giteeId,
              githubId,
              works,
              following,
              recycle,
              myFollow,
            } = data
            this.setCurUserDetail({
              nickname,
              contactEmail,
              email,
              avatar,
              about,
              username,
              giteeId,
              githubId,
              works,
              liked,
              followers,
              following,
              recycle,
              myFollow,
              bgc,
            })
            this.$message.success('获取用户个人信息成功!')
          } else {
            // 没有该用户，跳转到404
            this.$router.replace({ name: '404' })
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('获取用户个人信息失败!')
        })
    },
  },
  components: {},
  beforeRouteLeave(to, from, next) {
    this.clearCurUserDetail()
    next()
  },
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
