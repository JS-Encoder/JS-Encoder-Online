<template>
  <div id="cycleBin">
    <v-card class="cycle-bin-tip d-flex" color="error" v-if="showTip">
      您的实例在放入回收站的7天内可恢复为正常状态，逾期则自动删除。
      <v-spacer></v-spacer>
      <v-icon class="pointer" @click="showTip=false">mdi-close</v-icon>
    </v-card>
    <div class="cycle-bin-list">
      <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
      <v-card elevation="0" color="#272727" class="instance d-flex flex-ai" v-for="item in 10" :key="item">
        <div class="d-flex flex-clo">
          <span class="instance-title">瀑布流布局</span>
          <span class="delete-time text-describe text-sm">删除日期：2021-8-23</span>
        </div>
        <v-spacer></v-spacer>
        <v-btn color="#333333" class="restore-btn">恢复</v-btn>
        <v-btn color="error" class="delete-btn">永久删除</v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTip: true,
      loading: true,
    }
  },
  methods: {},
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
  .cycle-bin-tip {
    padding: 15px;
    margin-top: 25px;
  }
  .cycle-bin-list {
    margin-top: 25px;
    .instance {
      padding: 10px;
      margin-bottom: 15px;
      .restore-btn {
        margin-right: 15px;
      }
    }
  }
}
</style>
