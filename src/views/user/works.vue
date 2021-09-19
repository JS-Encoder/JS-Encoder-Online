<template>
  <div id="works">
    <div class="work-list" v-show="!nothing">
      <div class="skeleton-list-item" v-for="(item, index) in 12" :key="index" v-show="loading">
        <instance-skeleton :self="true"></instance-skeleton>
      </div>
      <div class="work-list-item" v-for="(item, index) in workList" :key="item.exampleId" v-show="!loading">
        <self-instance-card :info="item" :cardIndex="index" @setFav="setFav" @search="init"></self-instance-card>
      </div>
    </div>
    <div class="create-tip flex-jcc" v-show="showNothingTip">
      <div class="tip-content d-flex flex-clo flex-ai" v-if="isSelfProfile">
        <span class="text-describe">你当前还没有实例保存在云端哦~</span>
        <span class="text-describe">赶快为社区贡献优质实例吧！</span>
        <router-link to="/newWork">
          <v-btn color="primary">
            <v-icon left>mdi-plus</v-icon>新建实例
          </v-btn>
        </router-link>
      </div>
      <div class="tip-content d-flex flex-clo flex-ai" v-else>
        <span class="title-lg">🍃</span>
        <span class="title-sm text-describe">这里空空如也...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import InstanceSkeleton from '@components/skeleton/instanceSkeleton'
import SelfInstanceCard from '@components/selfInstanceCard'
import * as p2b from '@utils/paramsToBase64'
export default {
  name: 'Works',
  data() {
    return {
      workList: [],
      loading: true,
      nothing: true,
      showNothingTip: false,
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['curUserDetail']),
    ...mapGetters(['isSelfProfile']),
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
      this.nothing = false
      try {
        const { state, data } = await this.$http.searchWorks({
          currentPage: page,
          orderCondition: sortBy,
          username: this.curUserDetail.username,
        })
        if (state) {
          const { isFirstPage, isLastPage, list, total } = data
          this.nothing = list.length === 0
          this.showNothingTip = list.length === 0
          this.workList = list
          this.$emit('setPageConn', isFirstPage, isLastPage)
          this.$emit('updateNum', 'works', total)
          this.$message.success('查询用户实例成功！')
        } else {
          this.$message.error('查询失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    setFav(isFav, index) {
      const item = this.workList[index]
      item.myFavorites = isFav
      item.favorites += isFav ? 1 : -1
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
    display: flex;
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
