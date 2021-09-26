<template>
  <v-card class="user-card d-flex no-select">
    <div class="avatar">
      <v-avatar class="pointer" color="primary" size="50" @click="viewUserProfile">
        <img v-if="avatar" :src="qiNiuImgLink+avatar" :alt="nickname">
        <span class="white--text text-h6" v-else>{{nickname|preNickname}}</span>
      </v-avatar>
      <v-spacer></v-spacer>
    </div>
    <div class="user-info flex-1 d-flex">
      <div class="d-flex flex-clo info-text">
        <span class="nickname text-md pointer" @click="viewUserProfile">{{nickname}}</span>
        <span class="about text-xs">{{about||'ta还没想好怎么描述自己...'}}</span>
      </div>
      <div class="btn-opt" v-if="!isSelf">
        <v-btn color="#3C3C3C" width="90" v-if="myFollow" :loading="loading" @click="unFollow">取消关注</v-btn>
        <v-btn color="primary" width="90" v-else :loading="loading" @click="follow">关注</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { qiNiuImgLink } from '@utils/publicData'
export default {
  props: {
    avatar: String,
    nickname: String,
    about: String,
    myFollow: Boolean,
    username: String,
  },
  data() {
    return {
      qiNiuImgLink,
      loading: false,
    }
  },
  computed: {
    ...mapState(['loginState', 'loginInfo']),
    isSelf() {
      return this.loginInfo.username === this.username
    },
  },
  methods: {
    async follow() {
      if (!this.loginState) {
        this.$message.info('请登录后再进行相关操作！')
        return void 0
      }
      this.loading = true
      try {
        const res = await this.$http.addFollow({
          username: this.loginInfo.username,
          followUsername: this.username,
        })
        if (res.state) {
          // this.$message.success('关注成功！')
          this.$emit('setFollow', true)
        } else {
          // this.$message.error('关注失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    async unFollow() {
      if (!this.loginState) {
        this.$message.info('请登录后再进行相关操作！')
        return void 0
      }
      this.loading = true
      try {
        const res = await this.$http.delFollow({
          username: this.loginInfo.username,
          followUsername: this.username,
        })
        if (res.state) {
          // this.$message.success('取消关注成功！')
          this.$emit('setFollow', false)
        } else {
          // this.$message.error('取消关注失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    viewUserProfile() {
      this.$router.push(`/user/${this.username}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.user-card {
  width: 345px;
  padding: 15px;
  background-color: rgba(39, 39, 39, 0.3) !important;
  backdrop-filter: blur(5px);
  .user-info {
    width: 100%;
    margin-left: 15px;
    .info-text {
      width: calc(100% - 110px);
      margin-right: 15px;
      .nickname {
        display: block;
        @include text-ellipsis;
      }
      .about {
        margin-top: 5px;
        display: block;
        color: #eeeeee;
        @include text-ellipsis;
      }
    }
    .btn-opt {
      margin-top: 5px;
    }
  }
}
</style>
