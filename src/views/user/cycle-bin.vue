<template>
  <div id="cycleBin">
    <v-card class="cycle-bin-tip d-flex" color="error" v-if="showTip">
      您的实例在放入回收站的7天内可恢复为正常状态，逾期则自动删除。
      <v-spacer></v-spacer>
      <v-icon class="pointer" @click="showTip=false">mdi-close</v-icon>
    </v-card>
    <div class="cycle-bin-list">
      <v-skeleton-loader type="list-item-two-line" v-show="loading" v-for="item in 12" :key="item"></v-skeleton-loader>
      <v-card class="instance flex-ai" color="#272727" elevation="0" v-show="!loading" v-for="(item, index) in list"
        :key="item.exampleId">
        <div class="d-flex flex-clo">
          <span class="instance-title">{{item.exampleName}}</span>
          <span class="delete-time text-describe text-sm">删除日期：{{item.updateTime}}</span>
        </div>
        <v-spacer></v-spacer>
        <v-btn class="restore-btn" color="#333333" @click="restore(item.exampleId,index)"
          :loading="restoreLoading&&curIndex===index">恢复</v-btn>
        <v-btn class="delete-btn" color="error" @click="perDelete(item.exampleId,index)"
          :loading="deleteLoading&&curIndex===index">永久删除</v-btn>
      </v-card>
    </div>
    <div class="cycle-tip" v-show="showNothing">
      <div class="d-flex flex-clo flex-jcc flex-ai">
        <span class="icon-cycle">🗑</span>
        <span class="text-describe text-sm">回收站空空如也</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showTip: true,
      loading: true,
      deleteLoading: false,
      restoreLoading: false,
      curIndex: null,
      list: [],
      showNothing: false,
    }
  },
  created() {
    // 检测用户是否具有访问该页面的权限
    if (
      !this.loginState ||
      this.curUserDetail.username !== this.loginInfo.username
    ) {
      this.$router.replace('/404')
    }
    this.getRecycle()
  },
  computed: {
    ...mapState(['loginState', 'curUserDetail', 'loginInfo']),
  },
  methods: {
    async getRecycle() {
      this.loading = true
      try {
        const { state, data } = await this.$http.searchCycleBin()
        if (state) {
          this.list = Object.freeze(data)
          this.showNothing = data.length === 0
          this.$emit('setPageConn', true, true)
          this.$emit('updateNum', 'cycleBin', data.length)
          // this.$message.success('查询成功！')
        } else {
          // this.$message.error('查询失败！')
        }
      } catch (err) {}
      this.loading = false
    },
    async restore(exampleId, index) {
      this.restoreLoading = true
      this.curIndex = index
      try {
        const res = await this.$http.resumeDelWork({
          username: this.loginInfo.username,
          exampleId,
        })
        if (res.state) {
          // this.$message.success('恢复成功！')
          this.getRecycle()
        } else {
          // this.$message.error('恢复失败！')
        }
      } catch (err) {}
      this.curIndex = null
      this.restoreLoading = false
    },
    async perDelete(exampleId, index) {
      const confRes = await this.$alert({
        content: '该实例永久删除后将不可恢复！',
        okText: '确认并继续',
        okColor: 'error',
      })
      if (confRes) {
        this.curIndex = index
        this.deleteLoading = true
        try {
          const res = await this.$http.permanentDelWork({
            username: this.loginInfo.username,
            exampleId,
          })
          if (res.state) {
            // this.$message.success('永久删除成功！')
            this.getRecycle()
          } else {
            // this.$message.error('永久删除失败！')
          }
        } catch (err) {
          console.log(err)
        }
        this.curIndex = null
        this.deleteLoading = false
      }
    },
  },
  components: {},
}
</script>
<style lang="scss">
#cycleBin {
  .v-skeleton-loader__list-item-two-line {
    height: 65px;
    margin-bottom: 15px;
    background-color: $deep-3;
  }
}
</style>
<style lang="scss" scoped>
#cycleBin {
  padding-bottom: 100px;
  .cycle-bin-tip {
    padding: 15px;
    margin-top: 25px;
  }
  .cycle-bin-list {
    margin-top: 25px;
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    .instance {
      display: flex;
      padding: 10px;
      margin-bottom: 15px;
      .restore-btn {
        margin-right: 15px;
      }
    }
  }
  .cycle-tip {
    margin: 50px 0 100px;
    .icon-cycle {
      font-size: 48px;
    }
  }
}
</style>
