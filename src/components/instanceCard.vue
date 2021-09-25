<template>
  <v-card class="instance-card">
    <v-img class="instance-card-img" :src="`${qiNiuImgLink}${info.img||defPosterKey}`">
      <div class="img-screen pointer d-flex flex-ai flex-jcc" @click="viewInstance">
        <v-icon>mdi-eye</v-icon>
      </div>
    </v-img>
    <v-card-actions>
      <v-menu transition="none" offset-y open-delay="500" close-delay="200" top :open-on-hover="true"
        :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="40" class="pointer" v-bind="attrs" v-on="on" :color="info.userPicture?'':'primary'"
            @click.native="viewUserProfile">
            <v-img v-if="info.userPicture" :src="qiNiuImgLink+info.userPicture" :alt="info.name"></v-img>
            <span class="white--text text-h7" v-else>{{info.name|preNickname}}</span>
          </v-avatar>
        </template>
        <user-card :avatar="info.userPicture" :myFollow="info.myFollow" :username="info.username" :nickname="info.name"
          :about="info.description" @setFollow="setFollow"></user-card>
      </v-menu>
      <div class="instance-info d-flex flex-clo pointer">
        <span class="text-sm" :title="info.exampleName">{{info.exampleName}}</span>
        <span class="text-xs author" @click="viewUserProfile">{{info.name}}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon :class="info.myFavorites?'icon-like-active':'icon-like'" :loading="likeLoading" @click="like">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span class="liked-num text-xs">{{info.favorites|formatNumber}}</span>
      <v-btn class="icon-share" icon @click="shareLink">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserCard from '@components/userCard'
import { copyToClip } from '@utils/tools'
import { qiNiuImgLink, defPosterKey } from '@utils/publicData'
import env from '@service/env'
export default {
  props: {
    info: Object,
    cardIndex: Number,
  },
  data() {
    return {
      qiNiuImgLink,
      defPosterKey,
      likeLoading: false,
    }
  },
  computed: {
    ...mapState(['loginState', 'loginInfo']),
    ...mapGetters(['isSelfProfile']),
    isSelfWork() {
      return this.info.username === this.loginInfo.username
    },
  },
  methods: {
    shareLink() {
      const { username, exampleId } = this.info
      copyToClip(`${env.client}/work/${username}/${exampleId}`)
      this.$message.success('链接已复制到剪切板！')
    },
    viewInstance() {
      const { username, exampleId } = this.info
      this.$router.push(`/work/${username}/${exampleId}`)
    },
    viewUserProfile() {
      this.$router.push(`/user/${this.info.username}`)
    },
    async like() {
      if (!this.loginState) {
        this.$message.info('请登录后再进行相关操作！')
        return void 0
      } else if (this.isSelfWork) {
        this.$message.info('不能对自己的实例点喜欢哦')
        return void 0
      }
      const { myFavorites, exampleId } = this.info
      this.likeLoading = true
      try {
        // 根据当前是否已喜欢来判定调用喜欢还是取消喜欢接口
        const api = this.$http
        const req = myFavorites ? api.delLikeWork : api.addLikeWork
        const res = await req({ username: this.loginInfo.username, exampleId })
        if (res.state) {
          if (
            this.isSelfProfile &&
            myFavorites &&
            this.$route.name === 'Liked'
          ) {
            this.$emit('search')
          } else {
            this.setFav(!myFavorites)
          }
          this.$message.success(myFavorites ? '已取消喜爱！' : '已喜爱！')
        }
      } catch (err) {
        console.log(err)
      }
      this.likeLoading = false
    },
    setFollow(isFollow) {
      this.$emit('setFollow', isFollow, this.cardIndex)
    },
    setFav(isFav) {
      this.$emit('setFav', isFav, this.cardIndex)
    },
  },
  components: {
    UserCard,
  },
}
</script>

<style lang="scss" scoped>
.instance-card {
  width: 100%;
  .instance-card-img {
    height: 0;
    padding-bottom: 55%;
    position: relative;
    .img-screen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      @include setTransition(opacity, 0.3s, ease);
      &:hover {
        opacity: 1;
      }
    }
  }
  .instance-info {
    margin-left: 10px;
    width: calc(100% - 180px);
    span {
      display: block;
      @include text-ellipsis;
    }
    .author {
      color: $light-7;
      &:hover {
        color: $light-2;
      }
    }
  }
  .liked-num {
    margin-right: 5px;
    color: $light-4;
  }
  .icon-like,
  .icon-share {
    color: $light-7;
  }
  .icon-like-active {
    color: $red-1;
  }
  .icon-like {
    &:hover {
      color: $red-1;
    }
  }
  .icon-share {
    &:hover {
      color: $pink-1;
    }
  }
}
</style>
