<template>
  <v-card class="self-instance-card">
    <v-img :src="`${qiNiuImgLink}${info.img}`" class="instance-card-img">
      <div class="img-screen pointer d-flex flex-ai flex-jcc" @click="viewInstance">
        <v-icon>mdi-eye</v-icon>
      </div>
    </v-img>
    <v-card-actions>
      <div class="instance-info d-flex flex-clo pointer">
        <span class="text-sm" :title="info.exampleName">{{info.exampleName}}</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon :class="info.myFavorites?'icon-like-active':'icon-like'" :loading="likeLoading" @click="like">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span class="liked-num text-xs">{{info.favorites|formatNumber}}</span>
      <v-menu offset-y top v-if="isSelfProfile">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="icon-more" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list class="works-menu">
          <v-list-item class="works-menu-list" v-for="item in menuList" :key="item.value" link
            @click="handleMenu(item.value)">
            <v-icon class="icon">{{item.icon}}</v-icon>{{item.name}}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click="shareLink" class="icon-share" v-else>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { copyToClip } from '@utils/tools'
import { qiNiuImgLink } from '@utils/publicData'
import env from '@service/env'
export default {
  props: {
    info: Object,
    cardIndex: Number,
  },
  data() {
    return {
      qiNiuImgLink,
      menuList: [
        {
          name: '分享',
          value: 'share',
          icon: 'mdi-share-variant',
        },
        {
          name: '删除',
          value: 'delete',
          icon: 'mdi-trash-can',
        },
      ],
      likeLoading: false,
    }
  },
  computed: {
    ...mapState(['loginState', 'loginInfo']),
    ...mapGetters(['isSelfProfile']),
  },
  methods: {
    handleMenu(val) {
      switch (val) {
        case 'delete': {
          this.delete()
          break
        }
        case 'share': {
          this.shareLink()
          break
        }
      }
    },
    delete() {
      this.$alert({
        title: '删除实例',
        content: '实例将会在回收站内保存7天，7天后将永久删除，确认继续该操作么',
        okText: '确认并删除',
        okColor: 'error',
      }).then(async (res) => {
        if (res) {
          const delRes = await this.$http.delWork({
            exampleId: this.info.exampleId,
          })
          if (delRes.state) {
            this.$emit('search')
            this.$message.success('实例删除成功！')
          } else {
            this.$message.error('实例删除失败！')
          }
        }
      })
    },
    shareLink() {
      const { username, exampleId } = this.info
      copyToClip(`${env.client}/work/${username}/${exampleId}`)
      this.$message.success('链接已复制到剪切板！')
    },
    async like() {
      if (!this.loginState) {
        this.$message.info('请登录后再进行相关操作！')
        return void 0
      } else if (this.isSelfProfile) {
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
          this.$message.success(myFavorites ? '已取消喜爱！' : '已喜爱！')
          this.setFav(!myFavorites)
        }
      } catch (err) {
        console.log(err)
      }
      this.likeLoading = false
    },
    setFav(isFav) {
      this.$emit('setFav', isFav, this.cardIndex)
    },
    viewInstance() {
      const { username, exampleId } = this.info
      this.$router.push({
        path: `/work/${username}/${exampleId}`,
      })
    },
  },
  components: {},
}
</script>

<style lang="scss">
.works-menu {
  .works-menu-list {
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
.self-instance-card {
  width: 100%;
  .instance-card-img {
    height: 0;
    padding-bottom: 55%;
    position: relative;
    ::v-deep .v-image__image {
      background-position: 0% 0% !important;
    }
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
    width: calc(100% - 170px);
    span {
      display: block;
      @include text-ellipsis;
    }
  }
  .v-card__actions {
    height: 40px;
  }
  .liked-num {
    color: $light-4;
  }
  .icon-like,
  .icon-more,
  .icon-share {
    color: $light-7;
  }
  .icon-share {
    margin-left: 5px;
    &:hover {
      color: $pink-1;
    }
  }
  .icon-like-active {
    color: $red-1;
  }
  .icon-like {
    &:hover {
      color: $red-1;
    }
  }
  .icon-more {
    margin-left: 10px;
    &:hover {
      color: $light-2;
    }
  }
}
</style>
