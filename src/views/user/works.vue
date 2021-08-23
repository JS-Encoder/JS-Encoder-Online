<template>
  <div id="works">
    <div class="work-list">
      <div class="skeleton-list-item" v-for="(item, index) in 12" :key="index" v-show="loading">
        <instance-skeleton :self="true"></instance-skeleton>
      </div>
      <div class="work-list-item" v-for="item in workList" :key="item" v-show="!loading">
        <self-instance-card></self-instance-card>
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
import SelfInstanceCard from '@components/selfInstanceCard'
import * as p2b from '@utils/paramsToBase64'
export default {
  data() {
    return {
      p: 1,
      workList: [],
      loading: true,
    }
  },
  created() {
    this.workList = Array.from({ length: 12 }, (_, i) => i + 12)
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
  },
  components: {
    'instance-skeleton': InstanceSkeleton,
    'self-instance-card': SelfInstanceCard,
  },
}
</script>

<style lang="scss" scoped>
#works {
  .work-list {
    margin-top: 30px;
    display: grid;
    grid-gap: 30px;
  }
  .page-opt {
    margin-top: 50px;
    .before-btn {
      margin-right: 15px;
    }
  }
}
@include screenSM {
  #works {
    .work-list {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
