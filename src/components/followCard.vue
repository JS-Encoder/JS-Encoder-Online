<template>
  <div class="follow-card">
    <v-avatar class="avatar pointer" :color="userInfo.userPicture?'':'primary'" @click="viewUserProfile">
      <v-img v-if="userInfo.userPicture" :src="qiNiuImgLink+userInfo.userPicture" :alt="userInfo.name"></v-img>
      <span class="white--text text-h4" v-else>{{userInfo.name|preNickname}}</span>
    </v-avatar>
    <div class="follow-user-info">
      <div class="d-flex flex-ai">
        <span class="text-bold text-md">{{userInfo.name}}</span>
        <v-spacer></v-spacer>
        <v-btn width="80" small color="#3C3C3C" depressed v-if="userInfo.myFollow" :loading="unFollowLoading"
          @click="unFollow">取消关注</v-btn>
        <v-btn small color="primary" depressed width="80" v-else :loading="followLoading" @click="follow">关注</v-btn>
      </div>
      <span class="about text-describe text-sm">{{userInfo.description||'ta还没想好怎么描述自己...'}}</span>
      <div class="text-sm num">
        <span class="instances">实例: {{userInfo.works|formatNumber}}</span>
        <span class="follower">粉丝: {{userInfo.fan|formatNumber}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { qiNiuImgLink } from '@utils/publicData'
export default {
  props: {
    userInfo: Object,
    cardIndex: Number,
  },
  data() {
    return {
      qiNiuImgLink,
      followLoading: false,
      unFollowLoading: false,
    }
  },
  computed: {
    ...mapState(['loginState', 'loginInfo']),
    ...mapGetters(['isSelfProfile']),
  },
  methods: {
    viewUserProfile() {
      // 查看用户主页
      this.$router.push(`/user/${this.userInfo.username}`)
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
          followUsername: this.userInfo.username,
        })
        if (res.state) {
          this.$message.success('关注成功！')
          this.$emit('setFollow', true, this.cardIndex)
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
          followUsername: this.userInfo.username,
        })
        if (res.state) {
          this.$message.success('取消关注成功！')
          // 如果在自己的主页的关注页面取消关注，则重新查询关注列表
          if (this.isSelfProfile && this.$route.name === 'Following') {
            this.$emit('search')
          } else {
            this.$emit('setFollow', false, this.cardIndex)
          }
        } else {
          this.$message.error('取消关注失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.unFollowLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.follow-card {
  padding: 25px 0 0 25px;
  position: relative;
  .avatar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .follow-user-info {
    height: 130px;
    padding: 15px 25px;
    border-radius: 10px;
    background: linear-gradient(to right, $deep-2, $deep-4);
    .about {
      margin-top: 5px;
      display: block;
      height: 40px;
      @include texts-ellipsis(2);
    }
    .num {
      color: $light-4;
      margin-top: 5px;
      .instances {
        margin-right: 30px;
      }
    }
  }
}
</style>
