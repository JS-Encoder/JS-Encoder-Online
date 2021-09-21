<template>
  <v-text-field class="v-input-number" dense flat solo background-color="info" v-model="inputVal"
    :hide-details="hideDetails" @blur="onBlur" @keypress="onKeypress">
    <template v-slot:prepend-inner>
      <v-btn icon class="icon-btn" @click="subtract">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </template>
    <template v-slot:append>
      <v-btn class="icon-btn" icon @click="add">
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
      default: false,
    },
  },
  data() {
    return {
      inputVal: '',
    }
  },
  mounted() {
    this.inputVal = this.value
  },
  watch: {
    inputVal(newVal) {
      this.emitEvent(newVal)
    },
  },
  methods: {
    emitEvent(val) {
      this.$emit('input', val)
    },
    onBlur() {
      let num = parseInt(this.inputVal, 10)
      this.inputVal = Number.isNaN(num) || num < this.min ? this.min : num
    },
    onKeypress(e) {
      const keyCode = e.keyCode

      // 输入的不是0-9
      if (keyCode < 48 || keyCode > 57) {
        e.preventDefault()
        return void 0
      }

      // 如果输入的第一位是0，输入的下一个字符会自动覆盖0
      if (this.inputVal == '0') this.inputVal = ''
    },
    subtract() {
      if (this.inputVal < this.min + this.step) return void 0
      this.inputVal -= this.step
    },
    add() {
      this.inputVal += this.step
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
