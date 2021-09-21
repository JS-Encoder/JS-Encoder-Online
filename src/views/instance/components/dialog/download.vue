<template>
  <v-dialog id="download" max-width="500" content-class="download-dialog" v-model="visible"
    @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-xs">文件下载</span>
      </v-card-title>
      <v-card-text>
        <div class="download d-flex">
          <div class="single d-flex flex-clo flex-1 borbox" :class="type==='single'?'active':''" @click="type='single'">
            <div class="single-title">
              <v-icon class="icon">mdi-file-download-outline</v-icon>
              <span class="text-md text-light">单文件</span>
            </div>
            <span class="text-xs text-describe">将 HTML, CSS, 和 JavaScript 代码整合成一个 HTML 文件</span>
          </div>
          <div class="multiple d-flex flex-clo flex-1 borbox" :class="type==='multiple'?'active':''"
            @click="type='multiple'">
            <div class="multiple-title">
              <v-icon class="icon">mdi-folder-download-outline</v-icon>
              <span class="text-md">多文件</span>
            </div>
            <span class="text-xs text-describe">生成 html, css 和 js 三个文件并放入文件夹中</span>
          </div>
        </div>
        <div class="pre-compile d-flex flex-clo">
          <v-checkbox label="下载编译前的文件" dense hide-details v-model="preCompile"></v-checkbox>
          <span class="text-describe">如果你使用了预处理语言，选中此选项会下载未编译前的文件。</span>
        </div>
        <v-btn class="dwn-btn" color="info" @click="downloadFiles" block>下载</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Downloader from '@utils/editor/instanceDownloader.js'
export default {
  data() {
    return {
      name: 'download',
      visible: false,
      type: 'single',
      preCompile: true,
    }
  },
  computed: {
    ...mapState([
      'visibleDialogName',
      'instanceExtLinks',
      'instanceCode',
      'instanceSetting',
      'prep',
    ]),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
    downloadFiles() {
      const code = this.instanceCode
      const links = this.instanceExtLinks
      const prep = this.prep
      const dwPrep = this.preCompile
      const headTags = this.instanceSetting.headTags
      const downloader = new Downloader(code, links, prep, headTags, dwPrep)
      downloader.handle(this.type)
    },
  },
}
</script>

<style lang="scss">
.download-dialog {
  .download {
    height: 120px;
    .single,
    .multiple {
      padding: 10px;
      border: 1px solid $deep-2;
      border-radius: 4px;
      cursor: pointer;
      @include setTransition(all, 0.3s, ease);
      & > div {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: $light-2;
        margin-bottom: 10px;
        i {
          font-size: 20px;
          margin-right: 5px;
        }
      }
    }
    .active {
      border-color: $primary-1;
    }
    .single {
      margin-right: 5px;
    }
  }
  .pre-compile {
    margin-top: 15px;
    .text-describe {
      margin-top: 5px;
    }
  }
  .v-label {
    color: $light-2;
    font-size: 14px;
  }
  .dwn-btn {
    margin-top: 15px;
  }
}
</style>
