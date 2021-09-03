<template>
  <v-dialog id="upload" v-model="visible" max-width="500" @click:outside="setVisibleDialogName('')"
    content-class="upload-dialog">
    <v-card>
      <v-card-title>
        <span class="title-xs">上传文件</span>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-clo">
          <span class="text-xs text-describe">
            上传本地文件，格式包含
            <span class="text-white">html, md, pug, css, sass, scss, less, styl, js, ts, coffee,</span>
            文件内容将覆盖对应编辑窗口的内容。
          </span>
          <v-checkbox dense label="分解html文件" hide-details></v-checkbox>
          <span class="text-xs text-describe">选中此选项，编辑器将会把 html 文件中的 html,
            css 和 javascript 代码以及外部链接分离，代码会覆盖对应编辑器的代码，外部链接会自动添加到库中。</span>
          <a title="" href="javascript:;" class="borbox upload d-flex flex-jcc v-btn" @change="chooseFile">
            <input type="file" class="upload-input" ref="fileInput" multiple="multiple">
            选择文件
          </a>
          <div class="file-list d-flex flex-clo flex-ai" v-if="fileList.length">
            <span class="text-sm">待上传文件列表</span>
            <ul>
              <li v-for="(item, index) in fileList" :key="index" class="d-flex flex-ai text-sm">
                <v-icon dense small>mdi-file</v-icon>
                <span class="file-name">{{item.name}}</span>
                <v-icon dense small class="icon pointer" @click="delFile(index)">mdi-close</v-icon>
              </li>
            </ul>
            <v-btn color="info" @click="upload">上传文件</v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { limitMimeType } from '@utils/publicData'
import uploader from '@utils/editor/uploader'
export default {
  data() {
    return {
      name: 'upload',
      visible: false,
      fileList: [],
      resolve: true,
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
    ...mapMutations([
      'setVisibleDialogName',
      'setInstanceExtLinks',
      'setInstanceCode',
      'setPrep',
      'setCurTab',
    ]),
    chooseFile() {
      // 判断上传的文件中哪些是符合后缀名要求的
      const input = this.$refs.fileInput
      const files = input.files
      if (!files.length) return void 0
      for (let i = 0, k = files.length; i < k; i++) {
        const name = this.getMimeType(files[i].name)
        if (limitMimeType.includes(name)) {
          this.fileList.push(files[i])
        }
      }
    },
    getMimeType(fileName) {
      const pos = fileName.lastIndexOf('.')
      return fileName.substring(pos + 1)
    },
    delFile(index) {
      // 清除input中上一次传入的文件，因为如果不清除，下次上传同一个文件时不会触发change事件
      this.fileList.splice(index, 1)
      const input = this.$refs.fileInput
      input.value = ''
    },
    async upload() {
      /**
       * 上传文件，根据文件后缀更改预处理语言，将文件内容渲染到编辑窗口
       * 上传成功后会弹出提示并清理上传的文件列表
       */
      try {
        const fileList = this.fileList
        const resolve = this.resolve
        const codeObj = {}
        await uploader(fileList, resolve).then((res) => {
          let visibleTab = ''
          const { HTML, CSS, JavaScript } = res
          if (HTML) {
            const content = HTML.content
            if (this.resolve && HTML.type === 'html') {
              const { html, css, js, links, scripts } = content
              if (html) {
                codeObj.HTML = html
                this.setPrep({ index: 0, newPrep: 'HTML' })
              }
              if (css) {
                codeObj.CSS = css
                this.setPrep({ index: 1, newPrep: 'CSS' })
              }
              if (js) {
                codeObj.JavaScript = js
                this.setPrep({ index: 2, newPrep: 'JavaScript' })
              }
              if (links && links.length) {
                this.setInstanceExtLinks({ name: 'cssLinks', list: links })
              }
              if (scripts && scripts.length) {
                this.setInstanceExtLinks({ name: 'JSLinks', list: scripts })
              }
              visibleTab = 'HTML'
            } else {
              codeObj.HTML = content
              this.setPrep({ index: 0, newPrep: HTML.type })
              visibleTab = HTML.type
            }
          }
          if (CSS) {
            codeObj.CSS = CSS.content
            this.setPrep({ index: 1, newPrep: CSS.type })
            visibleTab = CSS.type
          }
          if (JavaScript) {
            codeObj.JavaScript = JavaScript.content
            this.setPrep({ index: 2, newPrep: JavaScript.type })
            visibleTab = JavaScript.type
          }
          this.setCurTab(visibleTab)
        })
        for (let lang in codeObj) {
          this.setInstanceCode({
            mode: lang,
            code: codeObj[lang],
          })
        }
        this.fileList = []
        this.$message.success({
          msg: '所有文件已全部上传成功！',
        })
      } catch (err) {
        this.$message.error({
          msg: '文件上传过程出错！',
        })
      }
    },
  },
  components: {},
}
</script>

<style lang="scss">
.upload-dialog {
  .v-label {
    color: $light-2;
    font-size: 14px;
  }
  .upload {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: $light-5;
    background-color: $deep-3;
    font-size: 14px;
    border-radius: 4px;
    position: relative;
    margin: 10px 0;
    border: 1px solid $deep-3;
    @include setTransition(all, 0.3s, ease);
    &:hover {
      border-color: $primary-1;
      color: $light-2;
    }
    .upload-input {
      width: 100%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
  .icon {
    color: $light-4;
    &:hover {
      color: $light-2;
    }
  }
  ul {
    padding: 0;
    margin-bottom: 10px;
    li {
      margin-top: 5px;
      .file-name {
        margin: 0 5px;
        width: 150px;
        display: inline-block;
        @include text-ellipsis();
      }
    }
  }
}
</style>
