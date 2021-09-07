<template>
  <div id="works">
    <div class="work-list" v-if="workList.length">
      <div class="skeleton-list-item" v-for="(item, index) in 12" :key="index" v-show="loading">
        <instance-skeleton :self="true"></instance-skeleton>
      </div>
      <div class="work-list-item" v-for="item in workList" :key="item" v-show="!loading">
        <self-instance-card></self-instance-card>
      </div>
    </div>
    <div class="page-opt d-flex flex-jcc" v-if="workList.length">
      <v-btn class="before-btn" @click="switchPage(-1)" :disabled="p<=1">上一页</v-btn>
      <v-btn color="primary" class="after-btn" @click="switchPage(1)">下一页</v-btn>
    </div>
    <div class="create-tip d-flex flex-jcc" v-else>
      <div class="tip-content d-flex flex-clo flex-ai">
        <span class="text-describe">你当前还没有实例保存在云端哦~</span>
        <span class="text-describe">赶快为社区贡献优质实例吧！</span>
        <router-link to="/newWork">
          <v-btn color="primary">
            <v-icon left>mdi-plus</v-icon>
            新建实例
          </v-btn>
        </router-link>
      </div>
    </div>
    <instance-config @setWorkInfo="setWorkInfo" :workInfo="workInfo"></instance-config>
  </div>
</template>

<script>
import InstanceSkeleton from '@components/skeleton/instanceSkeleton'
import SelfInstanceCard from '@components/selfInstanceCard'
import InstanceConfig from '@components/dialog/instanceConfig'
import * as p2b from '@utils/paramsToBase64'
export default {
  data() {
    return {
      p: 1,
      workList: [],
      loading: true,
      workInfo: {
        title: '',
        tags: [],
      },
    }
  },
  created() {
    // this.workList = Array.from({ length: 12 }, (_, i) => i + 12)
    // let f = this.$route.query.f
    // if (f) {
    //   f = p2b.decode(f)
    //   const p = parseInt(f.p)
    //   this.p = p > 1 ? p : 1
    // } else {
    //   this.p = 1
    // }
    this.search()
  },
  methods: {
    switchPage(changeNum) {
      const f = { p: (this.p += changeNum) }
      this.$router.push({
        path: 'works',
        query: { f: p2b.encode(f) },
      })
      this.search()
    },
    search(p) {
      p = p || this.p
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    setWorkInfo(workInfo) {
      this.workInfo = workInfo
    },
  },
  components: {
    InstanceSkeleton,
    SelfInstanceCard,
    InstanceConfig,
  },
}
</script>

<style lang="scss" scoped>
#works {
  .work-list {
    margin-top: 30px;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .page-opt {
    margin-top: 50px;
    .before-btn {
      margin-right: 15px;
    }
  }
  .create-tip {
    padding: 50px 0 150px 0;
    .tip-content {
      background-color: $deep-4;
      padding: 25px 50px;
      border-radius: 5px;
      span {
        margin-bottom: 10px;
      }
    }
  }
}
@include screenXL {
  #works {
    .work-list {
      grid-template-columns: repeat(4, minmax(300px, 1fr));
    }
  }
}
</style>
