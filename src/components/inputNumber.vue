<template>
  <v-text-field @blur="onBlur" dense flat solo background-color="info" @keypress="onKeypress" v-model="value"
    class="v-input-number" :hide-details="hideDetails">
    <template v-slot:prepend-inner>
      <v-btn icon class="icon-btn" @click="subtract">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </template>
    <template v-slot:append>
      <v-btn icon class="icon-btn" @click="add">
        <v-icon class="icon">mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script>
export default {
  model: { prop: 'value', event: 'input' },
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    onBlur() {
      let num = parseInt(this.value, 10)
      this.value = Number.isNaN(num) || num < this.min ? this.min : num
    },
    onKeypress(e) {
      const keyCode = e.keyCode

      // 输入的不是0-9
      if (keyCode < 48 || keyCode > 57) {
        e.preventDefault()
        return void 0
      }

      // 如果输入的第一位是0，输入的下一个字符会自动覆盖0
      if (this.value == '0') this.value = ''
    },
    subtract() {
      if (this.value < this.min + this.step) return void 0
      this.value -= this.step
    },
    add() {
      this.value += this.step
    },
  },
  components: {},
}
</script>

<style lang="scss">
.v-input-number {
  .v-input__slot {
    padding: 0 !important;
    input {
      text-align: center;
    }
  }
  .icon-btn {
    color: $light-4 !important;
    &:hover {
      color: $light-2 !important;
    }
  }
}
</style>
