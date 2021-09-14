<template>
  <v-card class="user-card d-flex no-select">
    <div class="avatar">
      <v-avatar size="50" class="pointer" color="primary">
        <img :src="qiNiuImgLink+avatar" v-if="avatar" alt="John">
        <span class="white--text text-h6" v-else>{{nickname|preNickname}}</span>
      </v-avatar>
      <v-spacer></v-spacer>
    </div>
    <div class="user-info flex-1 d-flex">
      <div class="d-flex flex-clo info-text">
        <span class="nickname text-md">{{nickname}}</span>
        <span class="about text-xs">{{about}}</span>
      </div>
      <div v-if="!isSelf" class="btn-opt">
        <v-btn color="#3c3c3c" v-if="myFollow">
          <v-icon left>mdi-plus</v-icon>取消关注
        </v-btn>
        <v-btn color="primary" v-else>
          <v-icon left>mdi-plus</v-icon>关注
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { qiNiuImgLink } from '@utils/publicData'
import { mapState } from 'vuex'
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
    }
  },
  computed: {
    ...mapState(['loginState', 'loginInfo']),
    isSelf() {
      return this.loginInfo.username === this.username
    },
  },
  methods: {},
  components: {},
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
        color: #f8f8f8;
        @include text-ellipsis;
      }
    }
    .btn-opt{
      margin-top: 5px;
    }
  }
}
</style>
