<template>
  <v-dialog id="shortcut" max-width="500" content-class="shortcut-dialog" v-model="visible"
    @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-xs">快捷键</span>
      </v-card-title>
      <v-card-text>
        <v-tabs align-with-title height="35" v-model="tab">
          <v-tab>通用</v-tab>
          <v-tab>Markdown</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <ul class="shortcut-list">
                <li class="d-flex flex-ai" v-for="(item, index) in commonListKb" :key="index">
                  <div class="key" v-for="(key, i) in item" :key="i">
                    <span v-if="i!==0">＋</span>
                    <kbd>{{key}}</kbd>
                  </div>
                  <span class="dot-line flex-1"></span>
                  <span class="affect">{{commonListText[index]}}</span>
                </li>
              </ul>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <ul class="shortcut-list">
                <li class="d-flex flex-ai" v-for="(item, index) in mdListKb" :key="index">
                  <div class="key" v-for="(key, i) in item" :key="i">
                    <span v-if="i!==0">＋</span>
                    <kbd>{{key}}</kbd>
                  </div>
                  <span class="dot-line flex-1"></span>
                  <span class="affect">{{mdListText[index]}}</span>
                </li>
              </ul>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      name: 'shortcut',
      tab: '',
      visible: false,
      commonListKb: Object.freeze([
        ['Tab'],
        ['Shift', 'Alt', 'F'],
        ['Ctrl / Cmd', 'Alt'],
        ['Ctrl / Cmd', 'Q'],
        ['Ctrl / Cmd', '/'],
        ['Ctrl / Cmd', 'Shift', 'D'],
        ['Ctrl / Cmd', 'D'],
        ['Shift', 'Ctrl / Cmd', 'Up'],
        ['Shift', 'Ctrl / Cmd', 'Down'],
        ['Ctrl / Cmd', '1'],
        ['Ctrl / Cmd', '2'],
        ['Ctrl / Cmd', '3'],
        ['Ctrl / Cmd', '['],
        ['Ctrl / Cmd', ']'],
        ['Ctrl / Cmd', 'F'],
        ['Ctrl / Cmd', 'Shift', 'F'],
        ['Alt', 'G'],
      ]),
      mdListKb: Object.freeze([
        ['Ctrl / Cmd', 'B'],
        ['Ctrl / Cmd', 'I'],
        ['Ctrl / Cmd', 'D'],
        ['Ctrl / Cmd', 'L'],
        ['Ctrl / Cmd', 'P'],
        ['Ctrl / Cmd', 'Shift', 'Q'],
        ['Ctrl / Cmd', 'K'],
        ['Ctrl / Cmd', 'U'],
        ['Ctrl / Cmd', 'O'],
        ['Ctrl / Cmd', 'H'],
        ['Ctrl / Cmd', 'Enter'],
      ]),
      mdListText: Object.freeze([
        '加粗',
        '倾斜',
        '中划线',
        '链接',
        '图片',
        '引用',
        '代码块',
        '无序列表',
        '有序列表',
        '横线',
        '列表延伸',
      ]),
      commonListText: Object.freeze([
        '缩进代码',
        '格式化代码',
        '智能提示',
        '收起代码',
        '注释',
        '行复制',
        '选择当前行',
        '向上互换行',
        '向下互换行',
        '聚焦HTML编辑器',
        '聚焦CSS编辑器',
        '聚焦JS编辑器',
        '左缩进代码',
        '右缩进代码',
        '代码查询',
        '代码替换',
        '跳至某行',
      ]),
    }
  },
  computed: {
    ...mapState(['visibleDialogName']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
  },
}
</script>

<style lang="scss">
.shortcut-dialog {
  .v-tab {
    margin-left: 0 !important;
    text-transform: capitalize !important;
  }
  .shortcut-list {
    margin-top: 10px;
    padding: 0 !important;
    li {
      margin: 5px 0;
      position: relative;
      kbd {
        font-family: $code;
      }
      .dot-line {
        border-top: 2px dotted $light-7;
        margin: 0 20px;
      }
    }
  }
}
</style>
