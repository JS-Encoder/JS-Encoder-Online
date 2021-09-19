<template>
  <div id="followers">
    <div class="follower-list" v-show="!nothing">
      <div class="skeleton-list-item" v-for="(item, index) in 20" :key="index" v-show="loading">
        <follow-skeleton></follow-skeleton>
      </div>
      <div class="follower-list-item" v-for="(item, index) in followersList" :key="item.username" v-show="!loading">
        <follow-card :cardIndex="index" @setFollow="setFollow" :userInfo="item"></follow-card>
      </div>
    </div>
    <div class="followers-tip flex-jcc" v-show="showNothingTip">
      <div class="tip-content d-flex flex-clo flex-ai" v-if="isSelfProfile">
        <span class="text-describe">你还没有粉丝...</span>
        <span class="text-describe">创造优秀作品，提升你在社区的影响力！</span>
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
import FollowSkeleton from '@components/skeleton/followSkeleton'
import FollowCard from '@components/followCard'
import * as p2b from '@utils/paramsToBase64'
export default {
  name: 'Followers',
  data() {
    return {
      followersList: [],
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
      let f = this.$route.query.f
      if (f) {
        ;({ page } = p2b.decode(f))
        page = parseInt(page)
      }
      this.search(page)
    },
    async search(page) {
      this.loading = true
      this.nothing = false
      try {
        const { state, data } = await this.$http.searchFollowers({
          currentPage: page,
          username: this.curUserDetail.username,
        })
        if (state) {
          const { isFirstPage, isLastPage, list, total } = data
          this.nothing = list.length === 0
          this.showNothingTip = list.length === 0
          this.followersList = list
          this.$emit('setPageConn', isFirstPage, isLastPage)
          this.$emit('updateNum', 'followers', total)
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
      this.followersList[index].myFollow = isFollow
    },
  },
  components: {
    FollowSkeleton,
    FollowCard,
  },
}
</script>

<style lang="scss" scoped>
#followers {
  .follower-list {
    margin-top: 30px;
    display: grid;
    grid-gap: 20px;
  }
  .page-opt {
    margin-top: 50px;
    .before-btn {
      margin-right: 15px;
    }
  }
  .followers-tip {
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
@include Mobile {
  #followers {
    .follower-list {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
}
@include PC {
  #followers {
    .follower-list {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
}
@include screenXL {
  #followers {
    .follower-list {
      grid-template-columns: repeat(5, minmax(auto, 350px));
    }
  }
}
</style>
