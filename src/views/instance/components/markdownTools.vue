<template>
  <div id="markdownTools" class="borbox">
    <div class="tools-list d-flex flex-sh">
      <div v-for="(icon, name) in tools" :key="name" class="tool borbox d-flex flex-jcc flex-ai flex-sh"
        @click="handleToolsCmd(name)">
        <i class="icon iconfont" :class="icon" v-if="name!=='title'"></i>
        <el-dropdown v-if="name==='title'" class="dropdown-menu d-flex flex-ai flex-jcc" placement="top-start"
          trigger="click">
          <i class="icon iconfont" :class="icon" style="font-size:20px"></i>
          <el-dropdown-menu class="menu" slot="dropdown" placement="bottom">
            <el-dropdown-item v-for="index in 6" :key="index" @click.native="addTitle(index)">
              H{{index}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import markdownTools from '@utils/editor/markdownTools'
export default {
  props: {
    getCodeMirror: Function,
    getIframeBody: Function,
  },
  data() {
    return {
      toolbarVisible: true,
      tools: {
        bold: 'icon-jiacu',
        italic: 'icon-xieti',
        delete: 'icon-shanchuxian',
        title: 'icon-biaoti',
        link: 'icon-lianjie',
        picture: 'icon-tupian',
        quote: 'icon-yinyong',
        code: 'icon-html',
        ul: 'icon-wuxuliebiao',
        ol: 'icon-youxuliebiao',
        line: 'icon-hengxian',
        pdf: 'icon-pdf',
      },
    }
  },
  methods: {
    addTitle(level) {
      const cm = this.$props.getCodeMirror(0)
      markdownTools.handleTitle(cm, level)
    },
    handleToolsCmd(toolName) {
      const cm = this.$props.getCodeMirror(0)
      switch (toolName) {
        case 'bold':
          markdownTools.handleTextStyle(cm, '**')
          break
        case 'italic':
          markdownTools.handleTextStyle(cm, '*')
          break
        case 'delete':
          markdownTools.handleTextStyle(cm, '~~')
          break
        case 'code':
          markdownTools.handleTextStyle(cm, '`')
          break
        case 'link':
          markdownTools.handleLink(cm)
          break
        case 'picture':
          markdownTools.handleLink(cm, true)
          break
        case 'line':
          markdownTools.handleLine(cm)
          break
        case 'quote':
          markdownTools.handleUnorderedList(cm, '> ')
          break
        case 'ul':
          markdownTools.handleUnorderedList(cm, '- ')
          break
        case 'ol':
          markdownTools.handleOrderList(cm)
          break
        case 'pdf':
          const element = this.$props.getIframeBody()
          markdownTools.htmlToPDF(element)
          break
        default:
          return void 0
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#markdownTools {
  width: 100%;
  height: 30px;
  cursor: pointer;
  position: relative;
  .tools-list {
    width: 100%;
    height: 100%;
    color: $light-5;
    overflow: hidden;
    background-color: $deep-3;
    border-top: 1px solid $deep-5;
    .tool {
      width: 40px;
      height: 100%;
      border-right: 1px solid $deep-5;
      &:hover {
        background-color: $deep-5;
        color: $light-2;
      }
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
