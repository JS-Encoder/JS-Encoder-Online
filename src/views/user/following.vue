<template>
  <div id="following">
    <div class="following-list">
      <div class="skeleton-list-item" v-for="(item, index) in 20" :key="index" v-show="loading">
        <follow-skeleton></follow-skeleton>
      </div>
      <div class="following-list-item" v-for="item in followingList" :key="item" v-show="!loading">
        <follow-card :following="true"></follow-card>
      </div>
    </div>
    <div class="page-opt d-flex flex-jcc">
      <v-btn class="before-btn" @click="switchPage(-1)" :disabled="p<=1">上一页</v-btn>
      <v-btn color="primary" class="after-btn" @click="switchPage(1)">下一页</v-btn>
    </div>
  </div>
</template>

<script>
import FollowSkeleton from '@components/skeleton/followSkeleton'
import FollowCard from '@components/followCard'
export default {
  data() {
    return {
      p: 1,
      followingList: [],
      loading: true,
    }
  },
  created() {
    this.followingList = Array.from({ length: 20 }, (_, i) => i + 20)
    let p = this.$route.query.p
    if (p) {
      p = parseInt(p)
      this.p = p > 1 ? p : 1
    } else {
      this.p = 1
    }
    this.search()
  },
  methods: {
    switchPage(changeNum) {
      this.$router.push({
        path: 'following',
        query: { p: (this.p += changeNum) },
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
  },
  components: {
    'follow-skeleton': FollowSkeleton,
    'follow-card': FollowCard,
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
