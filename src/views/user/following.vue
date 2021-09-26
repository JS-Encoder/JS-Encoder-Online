<template>
  <div id="following">
    <div class="following-list" v-show="!nothing">
      <div class="skeleton-list-item" v-show="loading" v-for="(item, index) in 20" :key="index">
        <follow-skeleton></follow-skeleton>
      </div>
      <div class="following-list-item" v-show="!loading" v-for="(item, index) in followingList" :key="item.username">
        <follow-card :cardIndex="index" :userInfo="item" @setFollow="setFollow" @search="init"></follow-card>
      </div>
    </div>
    <div class="following-tip flex-jcc" v-show="showNothingTip">
      <div class="tip-content d-flex flex-clo flex-ai" v-if="isSelfProfile">
        <span class="text-describe">你还没关注过任何人...</span>
        <span class="text-describe">不如探索一番，没准儿真会有你感兴趣的？</span>
        <router-link to="/explore">
          <v-btn color="primary">
            <v-icon left>mdi-cloud-search-outline</v-icon>去探索
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
  name: 'Following',
  data() {
    return {
      followingList: [],
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
      this.$emit('setPageConn', true, true)
      try {
        const { state, data } = await this.$http.searchFollowings({
          currentPage: page,
          username: this.curUserDetail.username,
        })
        if (state) {
          const { isFirstPage, isLastPage, list, total } = data
          this.nothing = list.length === 0
          this.showNothingTip = list.length === 0
          this.followingList = Object.freeze(list)
          this.$emit('setPageConn', isFirstPage, isLastPage)
          this.$emit('updateNum', 'following', total)
          // this.$message.success('查询成功！')
        } else {
          // this.$message.error('查询失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    setFollow(isFollow, index) {
      this.followingList[index].myFollow = isFollow
    },
  },
  components: {
    FollowSkeleton,
    FollowCard,
  },
}
</script>

<style lang="scss" scoped>
#following {
  .following-list {
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
  .following-tip {
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
  #following {
    .following-list {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
}
@include PC {
  #following {
    .following-list {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
}
@include screenXL {
  #following {
    .following-list {
      grid-template-columns: repeat(5, minmax(auto, 350px));
    }
  }
}
</style>
