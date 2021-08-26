<template>
  <v-overlay v-model="visible">
    <v-dialog :style="{'z-index':zIndex}" dark persistent v-model="visible" :max-width="maxWidth" :width="width">
      <v-card>
        <v-card-title class="text-h5" v-if="title">{{title}}</v-card-title>
        <v-card-text>{{content}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancel" v-if="showCancel">
            {{cancelText}}
          </v-btn>
          <v-btn text @click="ok">
            {{okText}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-overlay>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示',
    },
    width: {
      type: Number | String,
      default: 'auto',
    },
    maxWidth: {
      type: Number | String,
      default: 500,
    },
    content: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      visible: true,
    }
  },
  methods: {
    cancel() {
      this.close()
      this.$emit('cancel')
    },
    ok() {
      this.close()
      this.$emit('ok')
    },
    close() {
      this.visible = false
    },
  },
  components: {},
}
</script>

<style scoped>
</style>
