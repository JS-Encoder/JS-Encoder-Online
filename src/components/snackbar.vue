<template>
  <div class="message-box d-flex flex-clo">
    <transition-group name="list-complete">
      <v-alert v-for="opts in alertPool" dense border="left" :type="opts.type" :key="opts.id"
        class="list-complete-item">
        <span>{{opts.msg}}</span>
      </v-alert>
    </transition-group>
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
.list-complete-item {
  width: 100%;
  transition: all 0.3s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
