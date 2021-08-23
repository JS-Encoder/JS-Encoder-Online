<template>
  <v-skeleton-loader class="instance-skeleton" :class="self?'self-instance-skeleton':'other-instance-skeleton'"
    elevation="2" :type="self?'card':'card-avatar'" max-width="100%">
  </v-skeleton-loader>
</template>

<script>
export default {
  props: {
    self: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss">
.instance-skeleton {
}
.self-instance-skeleton {
  .v-skeleton-loader__card-heading {
    height: 40px;
    .v-skeleton-loader__heading {
      margin: 8px;
    }
  }
}
.other-instance-skeleton {
  .v-skeleton-loader__image {
    width: 100%;
    height: 0;
    padding-bottom: 55%;
  }
  .v-skeleton-loader__list-item-avatar {
    height: 57px;
  }
}
</style>

<style lang="scss" scoped>
.instance-skeleton {
  height: 100%;
}

@include screenLG {
  .instance-skeleton {
  }
}
</style>
