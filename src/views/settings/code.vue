<template>
  <div id="code">
    <div class="code-item code-def-prep d-flex flex-clo">
      <span class="item-title title-xs">默认预处理器</span>
      <div class="d-flex flex-ai flex-jcb select-opt" v-for="(value, key, index) in prepList" :key="key">
        <span class="sub-title">{{key}}</span>
        <v-select background-color="info" hide-details solo v-model="form.prep[index]" :menu-props="{ offsetY: true }"
          :items="value"></v-select>
      </div>
    </div>
    <div class="code-item code-def-code d-flex flex-clo">
      <span class="item-title title-xs">默认初始代码</span>
      <div class="d-flex flex-clo code-area" v-for="(value, key, index) in prepList" :key="index">
        <span class="code-area-title">{{form.prep[index]}}</span>
        <v-textarea background-color="info" rows="3" hide-details solo v-model="form.code[key]"
          :label="`${form.prep[index]} code...`" :style="fontStyle">
        </v-textarea>
      </div>
    </div>
    <div class="code-item code-def-code d-flex flex-clo">
      <span class="item-title title-xs">默认 head</span>
      <div class="code-area">
        <v-textarea label="输入你想在 <head> 中添加的标签如 <meta...>" background-color="info" rows="3" hide-details solo
          v-model="form.headTags" :style="fontStyle">
        </v-textarea>
      </div>
    </div>
    <div class="code-item code-def-indent d-flex flex-clo">
      <span class="item-title title-xs">代码缩进</span>
      <v-checkbox label="用等宽空格替换Tab" v-model="form.indent.replace" @change="setIndentReplace"></v-checkbox>
      <div class="d-flex flex-ai">
        <span class="sub-title">缩进数</span>
        <v-slider color="primary" ticks="always" step="2" thumb-label hide-details v-model="form.indent.width" :max="8"
          @change="setIndentWidth">
        </v-slider>
      </div>
    </div>
    <div class="code-item code-def-font d-flex flex-clo">
      <span class="item-title title-xs">字体</span>
      <div class="d-flex flex-ai font-opts">
        <span class="sub-title">字体</span>
        <v-select class="family-select" solo hide-details dense v-model="form.font.family" :items="fontFamList"
          :menu-props="{ offsetY: true }">
        </v-select>
      </div>
      <div class="d-flex flex-ai font-opts">
        <span class="sub-title">字号(px)</span>
        <v-select class="size-select" dense solo hide-details v-model="form.font.size" :items="fontSizeList"
          :menu-props="{ offsetY: true }" @change="refreshEditor">
        </v-select>
      </div>
      <div class="d-flex flex-ai font-opts">
        <span class="sub-title">预览</span>
        <codemirror class="preview-codemirror" ref="editor" :style="fontStyle" :options="codeOptions"
          :value="editorCode">
        </codemirror>
      </div>
    </div>
    <v-btn block x-large color="primary" @click="save">保存</v-btn>
  </div>
</template>

<script>
import { fontFamList, fontSizeList } from '@utils/publicData'
import { codemirror } from 'vue-codemirror'
import '@assets/themes/default.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/lib/codemirror.css'
import localStore from '@utils/local-storage'
export default {
  data() {
    return {
      prepList: Object.freeze({
        HTML: ['HTML', 'Markdown', 'Pug'],
        CSS: ['CSS', 'Sass', 'Scss', 'Less', 'Stylus'],
        JavaScript: ['JavaScript', 'TypeScript', 'CoffeeScript'],
      }),
      fontFamList: Object.freeze(fontFamList),
      fontSizeList: Object.freeze(fontSizeList),
      codeOptions: {},
      editorCode: '',
      form: {
        prep: ['HTML', 'CSS', 'JavaScript'],
        code: {
          HTML: '',
          CSS: '',
          JavaScript: '',
        },
        indent: {
          replace: false,
          width: 2,
        },
        font: {
          family: fontFamList[0],
          size: 16,
        },
        headTags: '',
      },
    }
  },
  created() {
    // 根据本地存储配置初始化表单
    const settings = JSON.parse(localStore.get('JSE_PERSONAL_SETTINGS'))
    settings && (this.form = settings)
  },
  mounted() {
    this.initEditor()
  },
  computed: {
    fontStyle() {
      const { family, size } = this.form.font
      return {
        fontFamily: family,
        fontSize: `${size}px`,
      }
    },
  },
  methods: {
    initEditor() {
      const { width, replace } = this.form.indent
      this.codeOptions = {
        tabSize: width,
        mode: 'text/javascript',
        theme: 'default',
        indentWithTabs: !replace,
        readOnly: 'nocursor',
        matchBrackets: false,
        scrollPastEnd: false,
        scrollbarStyle: 'null',
        lineWrapping: true,
      }
      this.editorCode = `function sum(a, b){\n\tconst res = a + b;\n\treturn res;\n}\nconsole.log(sum(1, 2))`
    },
    setIndentWidth(width) {
      this.codeOptions.tabSize = width
    },
    setIndentReplace(replace) {
      this.codeOptions.indentWithTabs = !replace
    },
    refreshEditor() {
      this.$refs.editor.refresh()
    },
    save() {
      const settings = this.form
      localStore.set('JSE_PERSONAL_SETTINGS', JSON.stringify(settings))
      this.$message.success('编码设置保存成功！')
    },
  },
  components: {
    codemirror,
  },
}
</script>

<style lang="scss">
#code {
  .family-select,
  .size-select {
    .v-input__control {
      min-height: 48px !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.preview-codemirror {
  width: 300px;
  ::v-deep .CodeMirror {
    font-family: inherit;
    height: auto;
    border-radius: 5px;
  }
}
#code {
  .code-item {
    margin-bottom: 25px;
    .item-title {
      margin-bottom: 10px;
    }
    .item-content {
      margin-top: 25px;
    }
    .sub-title {
      display: inline-block;
      width: 150px;
      flex-shrink: 0;
    }
  }
  .code-def-prep {
    .select-opt {
      margin-bottom: 15px;
    }
  }
  .code-def-code {
    .code-area {
      margin-bottom: 15px;
      .code-area-title {
        margin-bottom: 5px;
      }
    }
  }
  .code-def-font {
    .font-opts {
      margin-bottom: 15px;
    }
  }
}
</style>
