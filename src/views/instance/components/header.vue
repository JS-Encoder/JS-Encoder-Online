<template>
  <div id="instanceHeader" class="d-flex borbox">
    <div class="logo d-flex flex-ai flex-jcc flex-sh pointer">
      <router-link to="/" class="d-flex">
        <img src="../../../assets/logo/logo.svg" alt="" />
      </router-link>
    </div>
    <div class="instance-name flex-sh pointer d-flex flex-ai">
      <span class="inblock text-small">新建实例</span>
      <v-btn icon small @click="setVisibleDialogName('instanceConfig')" v-if="!isNewWork">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-ai">
      <div class="btn-opts">
        <v-btn color="#2a53cd" :disabled="disableSave" class="radius-2" small depressed @click="saveInstance"
          :loading="saveInstanceLoading" v-if="!hideSave">
          <v-icon left dark>
            mdi-cloud-upload
          </v-icon>
          保存
        </v-btn>
        <v-btn small color="info" class="radius-2" depressed @click="like" :loading="likeLoading"
          :disabled="!loginState" v-if="!hideLike">
          <v-icon left small color="red">mdi-heart</v-icon>喜爱
        </v-btn>
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
  data() {
    return {
      saveInstanceLoading: false,
      likeLoading: false,
    }
  },
  computed: {
    ...mapState(['loginState', 'loginInfo', 'curInstanceDetail']),
    ...mapGetters(['instanceContent']),
    isNewWork() {
      return this.$route.name === 'NewWork'
    },
    hideLike() {
      const isNewWork = this.isNewWork
      return isNewWork
    },
    disableSave() {
      return !this.loginState || this.curInstanceDetail.saved
    },
    hideSave() {
      return false
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
        username: loginInfo.username,
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
          this.setCurInstanceDetail({ saved: false })
          // 重定向到正式实例页面
          if (!isNewWork) {
            this.$router
              .replace(`/work/${loginInfo.username}/${res.data}`)
              .catch((err) => {})
            this.$emit('initInstanceData')
          }
        } else {
          this.$message.error('实例保存失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.saveInstanceLoading = false
    },
    like() {
      this.likeLoading = true
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
  }
  .btn-opts {
    margin-right: 15px;
    button {
      margin-right: 5px;
    }
  }
}
</style>
