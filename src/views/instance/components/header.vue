<template>
  <div id="instanceHeader" class="d-flex borbox">
    <div class="logo d-flex flex-ai flex-jcc flex-sh pointer">
      <router-link to="/" class="d-flex">
        <img src="../../../assets/logo/logo.svg" alt="" />
      </router-link>
    </div>
    <div class="instance-name flex-sh pointer d-flex flex-ai">
      <div class="d-flex flex-end">
        <span class="text-small">{{isNewWork?'新建实例':curInstanceDetail.title}}</span>
        <span class="text-xs author" @click="goToUserProfile" v-if="!isNewWork">By {{curInstanceDetail.nickname}}</span>
      </div>
      <v-btn icon small @click="setVisibleDialogName('instanceConfig')" v-if="!isNewWork&&isSelfInstance">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-menu :close-on-content-click="false" offset-y open-delay="200" close-delay="200" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on" v-if="!isNewWork&&!isSelfInstance" :disabled="tags.length===0">
            <v-icon>mdi-label-multiple-outline</v-icon>
          </v-btn>
        </template>
        <v-card color="info" style="padding: 10px">
          <v-chip v-for="(item,index) in tags" :key="index" small style="margin: 0 5px">{{item}}</v-chip>
        </v-card>
      </v-menu>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-ai">
      <div class="btn-opts">
        <v-btn color="#2a53cd" :disabled="disableSave" class="radius-2" small depressed @click="saveInstance"
          :loading="saveInstanceLoading" v-if="isSelfInstance || isNewWork">
          <v-icon left dark>mdi-cloud-upload</v-icon>保存
        </v-btn>
        <div v-if="!hideLike">
          <v-btn small color="info" class="radius-2" depressed @click="like" :loading="likeLoading"
            :disabled="!loginState" v-show="curInstanceDetail.liked">
            <v-icon left small color="red">mdi-heart</v-icon>取消喜爱
          </v-btn>
          <v-btn small color="info" class="radius-2" depressed @click="like" :loading="likeLoading"
            :disabled="!loginState" v-show="!curInstanceDetail.liked">
            <v-icon left small color="gray">mdi-heart</v-icon>喜爱
          </v-btn>
        </div>
      </div>
      <header-account dense></header-account>
    </div>
    <instance-config></instance-config>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

import HeaderAccount from '@components/headerAccount.vue'
import InstanceConfig from '@components/dialog/instanceConfig.vue'
export default {
  inject: ['changeRouterKey'],
  data() {
    return {
      saveInstanceLoading: false,
      likeLoading: false,
      tags: [],
    }
  },
  created() {
    const tags = this.curInstanceDetail.tags
    this.tags = tags ? tags.split(',') : []
  },
  computed: {
    ...mapState(['loginState', 'loginInfo', 'curInstanceDetail']),
    ...mapGetters(['instanceContent', 'isSelfInstance']),
    isNewWork() {
      return this.$route.name === 'NewWork'
    },
    hideLike() {
      const isNewWork = this.isNewWork
      return isNewWork || this.isSelfInstance
    },
    disableSave() {
      return !this.loginState || this.curInstanceDetail.saved
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setCurInstanceDetail']),
    async saveInstance() {
      this.saveInstanceLoading = true
      const instance = this.curInstanceDetail
      const loginInfo = this.loginInfo
      const isNewWork = this.isNewWork
      const {
        instanceCode,
        instanceExtLinks,
        compiledCode: content,
        headTags,
        prep,
      } = this.instanceContent
      const codeContent = JSON.stringify({
        instanceCode,
        instanceExtLinks,
        headTags,
      })
      const reqData = {
        exampleName: isNewWork ? '新建实例' : instance.title,
        ispublic: instance.ispublic,
        label: instance.tags,
        content,
        codeContent,
        htmlStyle: prep[0],
        cssStyle: prep[1],
        jsStyle: prep[2],
      }
      // 如果不是第一次创建实例就传id
      !isNewWork && (reqData.exampleId = instance.id)
      try {
        // 保存实例，如果是第一次保存(新建)，则重定向到正式实例页面
        const res = await this.$http.saveWork(reqData)
        if (res.state) {
          this.$message.success('实例保存成功！')
          this.setCurInstanceDetail({ saved: true })
          // 重定向到正式实例页面
          if (isNewWork) {
            this.$router
              .replace(`/work/${loginInfo.username}/${res.data}`)
              .then(() => {
                this.changeRouterKey()
              })
          }
        } else {
          this.$message.error('实例保存失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.saveInstanceLoading = false
    },
    goToUserProfile() {
      // 跳转到当前实例用户首页
      const username = this.curInstanceDetail.username
      this.$router.push(`/user/${username}`)
    },
    async like() {
      const { liked: myFavorites, id: exampleId } = this.curInstanceDetail
      this.likeLoading = true
      try {
        // 根据当前是否已喜欢来判定调用喜欢还是取消喜欢接口
        const api = this.$http
        const req = myFavorites ? api.delLikeWork : api.addLikeWork
        const res = await req({ username: this.loginInfo.username, exampleId })
        if (res.state) {
          this.setCurInstanceDetail({ liked: !myFavorites })
          this.$message.success(myFavorites ? '已取消喜爱！' : '已喜爱！')
        }
      } catch (err) {
        console.log(err)
      }
      this.likeLoading = false
    },
  },
  components: {
    HeaderAccount,
    InstanceConfig,
  },
}
</script>

<style lang="scss" scoped>
#instanceHeader {
  width: 100%;
  height: 41px;
  background-color: $deep-2;
  border-bottom: 1px solid $deep-5;
  position: relative;
  padding-right: 10px;
  .logo {
    width: 40px;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .instance-name {
    color: $light-5;
    margin-left: 20px;
    .author {
      margin-left: 5px;
      margin-right: 10px;
      color: $light-7;
      &:hover {
        color: $light-2;
      }
    }
  }
  .btn-opts {
    margin-right: 15px;
    button {
      margin-right: 5px;
    }
  }
}
</style>
