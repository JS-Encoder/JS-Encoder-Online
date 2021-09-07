<template>
  <div id="account">
    <div class="account-item account-third d-flex flex-clo">
      <span class="item-title title-xs">第三方账户</span>
      <span class="text-sm text-describe">绑定第三方账户，你就可以通过第三方账户进行快捷登陆。</span>
      <div class="item-content">
        <div class="d-flex flex-ai third-list">
          <i class="icon iconfont icon-github title-lg"></i>
          <span>GitHub</span>
          <v-spacer></v-spacer>
          <v-btn text color="error" v-if="loginInfo.githubId" @click="unbindTip('github')" :loading="githubLoading"
            disabled>解除绑定
          </v-btn>
          <v-btn text color="primary" v-else @click="bindGithub" :loading="githubLoading" disabled>绑定账户</v-btn>
        </div>
        <div class="d-flex flex-ai third-list">
          <i class="icon iconfont icon-gitee title-lg"></i>
          <span>Gitee</span>
          <v-spacer></v-spacer>
          <v-btn text color="error" v-if="loginInfo.giteeId" @click="unbindTip('gitee')" :loading="giteeLoading">解除绑定
          </v-btn>
          <v-btn text color="primary" v-else @click="bindGitee" :loading="giteeLoading">绑定账户</v-btn>
        </div>
      </div>
    </div>
    <div class="account-item account-email d-flex flex-clo">
      <span class="item-title title-xs">绑定邮箱</span>
      <span class="text-sm text-describe">修改绑定的邮箱，该邮箱用于找回密码及其他操作。</span>
      <div class="item-content">
        <v-row>
          <v-col cols="8">
            <v-text-field solo label="输入修改后的邮箱"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" height="48" block x-large>修改</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="account-item account-delete d-flex flex-clo">
      <span class="item-title title-xs">删除账户</span>
      <span class="text-sm text-describe">请注意！这样会删除你的账户和里面的所有信息，该操作无法恢复！</span>
      <div class="item-content">
        <v-btn color="error" class="col-6" x-large>删除账户</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { randomCSRFToken } from '@utils/tools'
import cookie from '@utils/cookie'
import oauthCONFIG from '@utils/oauthConfig'
import baseUrl from '@service/env'
import qs from 'qs'
export default {
  data() {
    return {
      giteeLoading: false,
      githubLoading: false,
    }
  },
  computed: {
    ...mapState(['loginInfo']),
  },
  methods: {
    ...mapMutations(['setLoginInfoItem']),
    unbindTip(type) {
      this.$alert({
        content: '确认解除该第三方绑定么？',
        okColor: 'error',
        okText: '解除绑定',
      }).then((isUnbind) => {
        if (isUnbind) {
          if (type === 'gitee') {
            this.unbindGitee()
          } else {
            this.unbindGithub()
          }
        }
      })
    },
    async unbindGitee() {
      try {
        const res = await this.$http.unbindGitee({
          username: this.loginInfo.username,
        })
        if (res.state) {
          this.$message.success('解绑成功！')
          this.setLoginInfoItem({ key: 'giteeId', val: null })
        } else {
          this.$message.error('解绑失败！')
        }
      } catch (err) {
        console.log(err)
        this.$message.error('啊哦~服务器出了点问题😭')
      }
    },
    unbindGithub() {
      const formData = new FormData()
      formData.append('username', this.loginInfo.username)
      this.$http.unbindGithub(formData).catch((err) => {
        console.log(err)
        this.$message.error('解绑失败！')
      })
    },
    bindGithub() {},
    bindGitee() {
      const csrfT = randomCSRFToken()
      const requireStr = qs.stringify({
        client_id: oauthCONFIG.gitee.clientID,
        redirect_uri: `${baseUrl.client}/?type=gitee`,
        response_type: 'code',
        state: csrfT,
      })
      cookie.set('CSRF_TOKEN', csrfT, 60 * 10)
      window.open(`https://gitee.com/oauth/authorize?${requireStr}`)
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#account {
  .account-item {
    margin-bottom: 15px;
    .item-title {
      margin-bottom: 10px;
    }
    .item-content {
      margin-top: 25px;
    }
  }
  .account-third {
    .third-list {
      margin-bottom: 15px;
      .icon {
        margin-right: 25px;
      }
    }
  }
}
</style>
