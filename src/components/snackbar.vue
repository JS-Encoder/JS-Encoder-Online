<template>
  <v-snackbar v-model="visible" :color="color" :bottom="bottom" :top="!bottom">
    {{ msg }}
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" v-if="showClose" icon @click="close" color="#F2F2F2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateSnackbar } = createNamespacedHelpers('snackbar')
export default {
  computed: {
    ...mapStateSnackbar([
      'msg',
      'visible',
      'bottom',
      'showClose',
      'color',
    ])
  },
  methods: {
    close() {
      this.$store.commit('snackbar/closeSnackbar')
    },
  },
}
</script>

<style scoped>
</style>
