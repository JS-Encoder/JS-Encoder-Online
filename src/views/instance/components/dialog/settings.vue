<template>
  <v-dialog id="settings" v-model="visible" max-width="500" @click:outside="closeDialog"
    content-class="settings-dialog">
    <v-card>
      <v-card-title>
        <span class="title-xs">设置</span>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-clo">
          <span class="lib-title">延迟执行时间</span>
          <span class="text-xs text-describe">当你完成代码后，我们将等待一段时间后执行它。</span>
          <div class="d-flex flex-ai delay">
            <input-number v-model="settings.delayTime" :hideDetails="true" :min="200" :step="50"></input-number>
            <span class="unit">(ms)</span>
          </div>
          <v-checkbox dense label="自动执行" hide-details v-model="settings.autoExecute"></v-checkbox>
          <span class="text-xs text-describe">选中此选项将会自动执行代码，如果没有选中则需点击执行按钮执行代码</span>
          <v-checkbox dense label="代码提示" hide-details v-model="settings.autoComplete"></v-checkbox>
          <span class="text-xs text-describe">选中此选项将会在你输入代码时进行适当提示</span>
          <v-checkbox dense label="代码规范检查" hide-details v-model="settings.lint"></v-checkbox>
          <span class="text-xs text-describe">启用此项将对代码进行规范检查，目前暂不支持预处理语言的检查</span>
          <v-checkbox dense label="代码超过编辑窗口宽度后换行显示" hide-details v-model="settings.lineWrap"></v-checkbox>
          <span class="lib-title">代码缩进</span>
          <v-checkbox dense label="用等宽空格替换Tab" hide-details v-model="settings.indent.replace"></v-checkbox>
          <div class="d-flex flex-ai">
            <span class="sub-title text-white">缩进数: {{settings.indent.width}}</span>
            <v-slider v-model="settings.indent.width" color="primary" thumb-label ticks="always" step="2" :max="8"
              hide-details>
            </v-slider>
          </div>
          <span class="lib-title">字体</span>
          <div class="d-flex flex-ai sub">
            <span class="sub-title text-white flex-sh">字体</span>
            <v-select class="family-select" solo hide-details background-color="info" dense :items="fontFamList"
              :menu-props="{ offsetY: true }" v-model="settings.font.family">
            </v-select>
          </div>
          <div class="d-flex flex-ai sub">
            <span class="sub-title text-white flex-sh">字号(px)</span>
            <v-select class="family-select" solo hide-details background-color="info" dense :items="fontSizeList"
              :menu-props="{ offsetY: true }" v-model="settings.font.size">
            </v-select>
          </div>
          <span class="lib-title">头部标签</span>
          <v-textarea solo label="输入你想在 <head> 中添加的标签如 <meta...>" class="head-textarea" hide-details
            background-color="info" rows="3" v-model="settings.headTags">
          </v-textarea>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import InputNumber from '@components/inputNumber.vue'
import { fontFamList, fontSizeList } from '@utils/publicData'
export default {
  data() {
    return {
      name: 'settings',
      settings: {
        delayTime: 500,
        autoExecute: true,
        autoComplete: true,
        lint: true,
        lineWrap: true,
        indent: {
          replace: true,
          width: 2,
        },
        font: {
          family: fontFamList[0],
          size: 14,
        },
        headTags: '',
      },
      visible: false,
      fontFamList,
      fontSizeList,
    }
  },
  created() {
    this.settings = this.instanceSetting
  },
  computed: {
    ...mapState(['visibleDialogName', 'instanceSetting']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setAllInstanceSetting']),
    closeDialog() {
      const settings = this.settings
      this.setAllInstanceSetting(settings)
      this.setVisibleDialogName('')
    },
  },
  components: {
    InputNumber,
  },
}
</script>

<style lang="scss">
.settings-dialog {
  .delay {
    width: 200px;
    margin-top: 5px;
    .unit {
      margin-left: 5px;
    }
  }
  .v-input--selection-controls {
    margin-top: 5px;
  }
  .lib-title {
    color: $light-2;
    margin-top: 5px;
  }
  .v-label {
    color: $light-2;
    font-size: 14px;
  }
  .sub {
    margin-top: 10px;
  }
  .sub-title {
    width: 150px;
    display: inline-block;
  }
  .head-textarea {
    font-family: $code;
    margin-top: 5px;
  }
}
</style>
