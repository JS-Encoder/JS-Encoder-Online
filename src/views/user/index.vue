<template>
  <div id="user" class="d-flex flex-clo flex-ai">
    <div class="user-info-box flex-clo flex-ai"
      :style="{'--user-bgc':`url(${qiNiuImgLink+curUserDetail.avatar})`}" v-show="!userInfoLoading">
      <v-avatar size="100" class="avatar" :color="curUserDetail.avatar?'':'primary'">
        <v-img :src="qiNiuImgLink+curUserDetail.avatar" v-if="curUserDetail.avatar"></v-img>
        <span class="white--text text-h4" v-else>{{curUserDetail.nickname|preNickname}}</span>
        <router-link to="/settings" v-if="isSelfProfile">
          <v-btn fab class="edit-btn" x-small title="设置">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </router-link>
        <v-btn fab class="edit-btn" x-small title="取消关注" :loading="unFollowLoading" v-else-if="isMyFollow"
          color="#777777" @click="unFollow">
          <v-icon>mdi-account-remove</v-icon>
        </v-btn>
        <v-btn fab class="edit-btn" x-small title="关注" :loading="followLoading" v-else-if="!isMyFollow&&loginState"
          color="primary" @click="follow">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </v-avatar>
      <div class="info-text d-flex flex-1 flex-clo flex-ai">
        <span class="nickname text-bold title-md">{{curUserDetail.nickname}}</span>
        <span class="username text-md">@{{curUserDetail.username}}</span>
        <p class="about text-describe text-sm">{{about}}</p>
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
          <v-tabs ref="tabs" class="tab-list" v-model="curTabName" center-active show-arrows grow>
            <v-tab class="tab" v-for="item in tabList" :key="item.route" @click="switchTabs(item)"
              :href="`#${item.route}`">
              <span class="text-md">{{item.name}}</span>
              <div class="item-num text-xs">{{num[item.path]|formatNumber}}</div>
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="2" class="col-space"></v-col>
        <v-spacer></v-spacer>
        <v-col md="2" sm="3" cols="11" class="flex-ai" style="display:flex" v-show="showSort">
          <span class="flex-sh sort-title" v-show="showSort">排序：</span>
          <v-select :items="sortList" solo :menu-props="{ offsetY: true }" v-model="sortBy" hide-details
            v-show="showSort" @change="switchRoute()">
          </v-select>
        </v-col>
        <v-col md="1" sm="1" cols="1" class="add-work flex-ai" v-show="isSelfWorks">
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
        <router-view v-if="showTabItems" :key="$route.fullPath" :page="page" :sortBy="sortBy" @setPageConn="setPageConn"
          @updateNum="updateNum"></router-view>
      </div>
      <div class="page-opt flex-jcc" v-show="!isFirstPage||!isLastPage">
        <v-btn class="before-btn" @click="switchPage(-1)" :disabled="isFirstPage">上一页</v-btn>
        <v-btn color="primary" class="after-btn" @click="switchPage(1)" :disabled="isLastPage">下一页</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import { qiNiuImgLink } from '@utils/publicData'
import * as p2b from '@utils/paramsToBase64'
export default {
  name: 'User',
  data() {
    return {
      qiNiuImgLink,
      tabList: [],
      num: {
        works: 0,
        liked: 0,
        following: 0,
        followers: 0,
        cycleBin: 0,
      },
      sortList: [
        { text: '创建时间', value: 0 },
        { text: '更新日期', value: 1 },
        { text: '喜爱度', value: 2 },
      ],
      page: 1,
      sortBy: 0,
      showSort: true,
      showTabItems: false,
      isFirstPage: false,
      isLastPage: false,
      followLoading: false,
      unFollowLoading: false,
      userInfoLoading: true,
    }
  },
  created() {
    this.showSort = ['Works', 'Liked'].includes(this.$route.name)
  },
  mounted() {
    this.initUserData()
  },
  computed: {
    ...mapState(['loginInfo', 'loginState', 'curUserDetail']),
    ...mapGetters(['isSelfProfile']),
    curTabName: {
      get() {
        return this.$route.name
      },
      set(val) {
        return val
      },
    },
    isMyFollow() {
      return this.curUserDetail.myFollow
    },
    isSelfWorks() {
      return this.curTabName === 'Works' && this.isSelfProfile
    },
    about() {
      const about = this.curUserDetail.about
      if (!about) {
        return !this.isSelfProfile ? 'ta还没想好怎么描述自己...' : ''
      } else {
        return about
      }
    },
  },
  methods: {
    ...mapMutations([
      'setCurUserDetail',
      'clearCurUserDetail',
      'setFollowState',
    ]),
    async initUserData() {
      this.showTabItems = false
      this.userInfoLoading = true
      await this.getUserInfo()
      this.handleTabs()
      const {
        works,
        liked,
        followers,
        following,
        recycle: cycleBin,
      } = this.curUserDetail
      this.num = { works, liked, followers, following, cycleBin }
      this.showTabItems = true
      this.callSlider()
      this.userInfoLoading = false
    },
    switchTabs(item) {
      // 切换tab更新查询信息
      this.page = 1
      this.sortBy = 0
      this.showSort = ['Works', 'Liked'].includes(item.route)
      this.switchRoute(item.route)
    },
    switchRoute(name) {
      // 切换路由，如果没有name就只更新query查询信息
      const f = { page: this.page }
      this.showSort && (f.sortBy = this.sortBy)
      name = name || this.$route.name
      const routeObj = { name, query: { f: p2b.encode(f) } }
      this.$router.push(routeObj).catch((err) => err)
      this.setPageConn(false, false)
    },
    switchPage(changeNum) {
      this.page += changeNum
      this.switchRoute()
    },
    setPageConn(isFirstPage, isLastPage) {
      this.isFirstPage = isFirstPage
      this.isLastPage = isLastPage
    },
    handleTabs() {
      const tabList = [
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
      ]
      if (this.isSelfProfile) {
        tabList.push({
          name: '回收站',
          route: 'CycleBin',
          path: 'cycleBin',
        })
      }
      this.tabList = tabList
    },
    updateNum(key, newNum) {
      // 在子路由列表进行删除的时候
      this.num[key] = newNum
    },
    async getUserInfo() {
      // 获取当前用户个人信息
      const username = this.$route.params.id
      try {
        const { data } = await this.$http.getUserInfo({ username })
        if (data) {
          const {
            name: nickname,
            userPicture: avatar,
            description: about,
            favorites: liked,
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
          })
          this.$message.success('获取用户个人信息成功!')
        } else {
          // 没有该用户，跳转到404
          this.$message.error('获取用户个人信息失败!')
          this.$router.replace({ name: '404' })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async follow() {
      if (!this.loginState) {
        this.$message.info('请登录后再进行相关操作！')
        return void 0
      }
      this.followLoading = true
      try {
        const res = await this.$http.addFollow({
          username: this.loginInfo.username,
          followUsername: this.curUserDetail.username,
        })
        if (res.state) {
          this.$message.success('关注成功！')
          this.setCurUserDetail({ myFollow: true })
          this.setFollowState(true)
        } else {
          this.$message.error('关注失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.followLoading = false
    },
    async unFollow() {
      if (!this.loginState) {
        this.$message.info('请登录后再进行相关操作！')
        return void 0
      }
      this.unFollowLoading = true
      try {
        const res = await this.$http.delFollow({
          username: this.loginInfo.username,
          followUsername: this.curUserDetail.username,
        })
        if (res.state) {
          this.$message.success('取消关注成功！')
          this.setCurUserDetail({ myFollow: false })
          this.setFollowState(false)
        } else {
          this.$message.error('取消关注失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.unFollowLoading = false
    },
    callSlider() {
      // 显示tabs slider
      this.$refs.tabs.onResize()
    },
  },
  beforeRouteUpdate(to, from, next) {
    const toId = to.params.id
    const fromId = from.params.id
    next()
    // 如果用户名不一致说明就是跳到了另一个人的主页，需要重新请求用户信息
    if (toId !== fromId) {
      this.initUserData()
    }
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
  padding: 0 35px 150px 35px;
  .user-info-box {
    width: 100%;
    min-height: 300px;
    position: relative;
    backdrop-filter: blur(10px);
    display: flex;
    --user-bgc: url('');
    z-index: 0;
    &:before {
      content: '';
      display: block;
      width: calc(100% + 70px);
      height: calc(100% + 70px);
      filter: blur(20px);
      position: absolute;
      background-image: linear-gradient(
          rgba(30, 30, 30, 0.3),
          rgba(30, 30, 30, 1) 100%
        ),
        var(--user-bgc);
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center center;
      left: -35px;
      top: -70px;
      z-index: -1;
    }
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
    .add-work {
      display: flex;
    }
    .page-opt {
      display: flex;
      margin-top: 50px;
      .before-btn {
        margin-right: 15px;
      }
    }
  }
}

@include Mobile {
  #user {
    padding: 0 10px 150px 10px;
    position: relative;
    z-index: 0;
    .user-info-box {
      min-height: 350px;
    }
    .user-views {
      .user-tabs {
        position: -webkit-sticky;
        position: sticky;
        z-index: 4;
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
