<template>
  <div class="message-box d-flex flex-clo">
    <v-alert v-for="(opts, index) in alertPool" dense border="left" :type="opts.type" :key="index"
      transition="scale-transition">
      <span>{{opts.msg}}</span>
    </v-alert>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateSnackbar } = createNamespacedHelpers('alertMsg')
export default {
  computed: {
    ...mapStateSnackbar(['alertPool']),
  },
}
</script>

<style lang="scss" scoped>
.message-box {
  position: fixed;
  top: 10px;
  left: 50%;
  z-index: 9999;
  min-width: 300px;
  max-width: 460px;
  transform: translateX(-50%);
}
</style>
