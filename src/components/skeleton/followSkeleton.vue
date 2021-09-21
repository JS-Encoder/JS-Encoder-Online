<template>
  <div class="follow-skeleton">
    <v-skeleton-loader class="avatar" type="avatar"></v-skeleton-loader>
    <v-skeleton-loader class="list" type="list-item-three-line"></v-skeleton-loader>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.follow-skeleton {
  .v-skeleton-loader__list-item-three-line {
    height: 130px;
    padding: 15px 25px;
    .v-skeleton-loader__text {
      margin-bottom: 15px;
    }
  }
}
</style>
<style lang="scss" scoped>
.follow-skeleton {
  position: relative;
  padding: 25px 0 0 25px;
  .avatar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
