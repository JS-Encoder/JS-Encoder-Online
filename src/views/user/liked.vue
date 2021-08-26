<template>
  <div id="liked">
    <div class="liked-list">
      <div class="skeleton-list-item" v-for="(item, index) in 12" :key="index" v-show="loading">
        <instance-skeleton></instance-skeleton>
      </div>
      <div class="liked-list-item" v-for="item in likedList" :key="item" v-show="!loading">
        <instance-card></instance-card>
      </div>
    </div>
    <div class="page-opt d-flex flex-jcc">
      <v-btn class="before-btn" @click="switchPage(-1)" :disabled="p<=1">上一页</v-btn>
      <v-btn color="primary" class="after-btn" @click="switchPage(1)">下一页</v-btn>
    </div>
  </div>
</template>

<script>
import InstanceSkeleton from '@components/skeleton/instanceSkeleton'
import InstanceCard from '@components/instanceCard'
import * as p2b from '@utils/paramsToBase64'
export default {
  data() {
    return {
      p: 1,
      likedList: [],
      loading: true,
    }
  },
  created() {
    this.likedList = Array.from({ length: 12 }, (_, i) => i + 12)
    let f = this.$route.query.f
    if (f) {
      f = p2b.decode(f)
      const p = parseInt(f.p)
      this.p = p > 1 ? p : 1
    } else {
      this.p = 1
    }
    this.search()
  },
  methods: {
    switchPage(changeNum) {
      const f = { p: (this.p += changeNum) }
      this.$router.push({
        path: 'liked',
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
  },
  components: {
    'instance-skeleton': InstanceSkeleton,
    'instance-card': InstanceCard,
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
}
@include screenXL {
  #liked .liked-list {
    grid-template-columns: repeat(4, minmax(300px, 1fr));
  }
}
</style>
