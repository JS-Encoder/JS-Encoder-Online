<template>
  <div id="liked">
    <div class="liked-list" v-show="!nothing">
      <div class="skeleton-list-item" v-show="loading" v-for="(item, index) in 12" :key="index">
        <instance-skeleton></instance-skeleton>
      </div>
      <div class="liked-list-item" v-show="!loading" v-for="(item, index) in likedList" :key="item.exampleId">
        <instance-card :info="item" :cardIndex="index" @setFollow="setFollow" @setFav="setFav" @search="init">
        </instance-card>
      </div>
    </div>
    <div class="liked-tip flex-jcc" v-show="showNothingTip">
      <div class="tip-content d-flex flex-clo flex-ai" v-if="isSelfProfile">
        <span class="heart">💓</span>
        <span class="title-lg">也许</span>
        <span class="title-sm">你还没有找到你喜欢的？</span>
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
import InstanceCard from '@components/instanceCard'
import * as p2b from '@utils/paramsToBase64'
export default {
  name: 'Liked',
  data() {
    return {
      likedList: [],
      loading: true,
      nothing: true,
      showNothingTip: false,
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['curUserDetail', 'loginInfo']),
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
      this.$emit('setPageConn', true, true)
      try {
        const { state, data } = await this.$http.searchLiked({
          currentPage: page,
          orderCondition: sortBy,
          username: this.curUserDetail.username,
        })
        if (state) {
          const { isFirstPage, isLastPage, list, total } = data
          this.nothing = list.length === 0
          this.showNothingTip = list.length === 0
          this.likedList = list
          this.$emit('setPageConn', isFirstPage, isLastPage)
          this.$emit('updateNum', 'liked', total)
          this.$message.success('查询成功！')
        } else {
          this.$message.error('查询失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    setFollow(isFollow, index) {
      this.likedList[index].myFollow = isFollow
    },
    setFav(isFav, index) {
      const item = this.likedList[index]
      item.myFavorites = isFav
      item.favorites += isFav ? 1 : -1
    },
  },
  components: {
    InstanceSkeleton,
    InstanceCard,
  },
}
</script>

<style lang="scss" scoped>
#liked {
  .liked-list {
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
  .liked-tip {
    display: flex;
    padding: 50px 0 150px 0;
    .tip-content {
      background-color: $deep-4;
      padding: 25px 50px;
      border-radius: 5px;
      color: $light-4;
      span {
        margin-bottom: 10px;
      }
      .heart {
        font-size: 48px;
      }
    }
  }
}
@include screenXL {
  #liked .liked-list {
    grid-template-columns: repeat(4, minmax(300px, 1fr));
  }
}
</style>
