<template>
  <div id="works">
    <div class="work-list" v-if="workList.length">
      <div class="skeleton-list-item" v-for="(item, index) in 12" :key="index" v-show="loading">
        <instance-skeleton :self="true"></instance-skeleton>
      </div>
      <div class="work-list-item" v-for="item in workList" :key="item.exampleId" v-show="!loading">
        <self-instance-card :info="item" :initData="init"></self-instance-card>
      </div>
    </div>
    <div class="create-tip d-flex flex-jcc" v-else>
      <div class="tip-content d-flex flex-clo flex-ai">
        <span class="text-describe">你当前还没有实例保存在云端哦~</span>
        <span class="text-describe">赶快为社区贡献优质实例吧！</span>
        <router-link to="/newWork">
          <v-btn color="primary">
            <v-icon left>mdi-plus</v-icon>新建实例
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InstanceSkeleton from '@components/skeleton/instanceSkeleton'
import SelfInstanceCard from '@components/selfInstanceCard'
import * as p2b from '@utils/paramsToBase64'
export default {
  props: {
    sortBy: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      workList: [0],
      loading: true,
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['curUserDetail']),
  },
  methods: {
    init() {
      let page = 1
      let sortBy = 0
      let f = this.$route.query.f
      if (f) {
        ;({ page, sortBy } = p2b.decode(f))
        page = parseInt(page)
        sortBy = parseInt(sortBy)
      }
      this.search(page, sortBy)
    },
    async search(page, sortBy) {
      this.loading = true
      try {
        const { state, data } = await this.$http.searchWorks({
          currentPage: page,
          orderCondition: sortBy,
          username: this.curUserDetail.username,
        })
        if (state) {
          const { isFirstPage, isLastPage, list } = data
          this.workList = list
          this.$emit('setPageConn', isFirstPage, isLastPage)
          this.$message.success('查询成功！')
        } else {
          this.$message.error('查询失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
  },
  components: {
    InstanceSkeleton,
    SelfInstanceCard,
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
