<template>
  <v-dialog id="prep" max-width="450" v-model="visible" @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-xs">预处理语言</span>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-clo prep">
          <div class="prep-item d-flex flex-ai" v-for="(item,index) in prepTitle" :key="index">
            <span class="flex-sh">{{item}}</span>
            <v-select solo hide-details dense background-color="info" v-model="prepList[index]"
              :items="defPrepOpts[item]"
              :menu-props="{ offsetY: true, transition:'slide-y-transition',closeOnClick:true }"
              @change="prepChange(index)">
            </v-select>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { defPrepOpts } from '@utils/publicData'
import { judgeMode } from '@utils/editor/judgeMode'
export default {
  data() {
    return {
      name: 'prep',
      visible: false,
      defPrepOpts: Object.freeze(defPrepOpts),
      prepList: null,
      prepTitle: Object.freeze(['HTML', 'CSS', 'JavaScript']),
    }
  },
  created() {
    this.prepList = [...this.prep]
  },
  computed: {
    ...mapState(['visibleDialogName', 'prep', 'curTab']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setPrep', 'setCurTab']),
    prepChange(index) {
      const newPrep = this.prepList[index]
      this.setPrep({ index, newPrep })
      if (judgeMode(newPrep) === judgeMode(this.curTab)) {
        this.setCurTab(newPrep)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* main style */
.prep {
  .prep-item {
    &:not(:first-child) {
      margin-top: 10px;
    }
    & > span {
      color: $light-2;
      width: 100px;
    }
  }
}
</style>
