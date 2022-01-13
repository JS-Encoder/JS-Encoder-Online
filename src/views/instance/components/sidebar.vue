<template>
  <div id="sidebar" class="borbox">
    <div class="tool-list">
      <v-tooltip color="info" transition="scroll-x-transition" right v-for="(item, index) in menuList" :key="index">
        <template v-slot:activator="{ on, attrs }">
          <div class="tool d-flex flex-ai flex-jcc" v-bind="attrs" v-on="on" @click="setVisibleDialogName(item.name)">
            <i class="icon iconfont" :class="item.icon"></i>
          </div>
        </template>
        <span>{{item.text}}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      menuList: Object.freeze([
        {
          text: '模板',
          name: 'templates',
          icon: 'icon-template'
        },
        {
          text: '预处理语言',
          name: 'prep',
          icon: 'icon-shalou',
        },
        {
          text: '库',
          name: 'library',
          icon: 'icon-ku',
        },
        {
          text: '设置',
          name: 'settings',
          icon: 'icon-kongzhitai',
        },
        {
          text: '上传代码',
          name: 'upload',
          icon: 'icon-yunduanshangchuan',
        },
        {
          text: '下载代码',
          name: 'download',
          icon: 'icon-xiazai1',
        },
        {
          text: '快捷键',
          name: 'shortcut',
          icon: 'icon-kuaijiejian1',
        },
      ]),
    }
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
  }
}
</script>

<style lang="scss" scoped>
#sidebar {
  width: 41px;
  height: 100%;
  background-color: $deep-2;
  border-right: 1px solid $deep-5;
  .tool-list {
    width: 100%;
    .tool {
      width: 100%;
      height: 40px;
      cursor: pointer;
      &:hover {
        background-color: $deep-4;
        .icon {
          color: $light-2;
        }
      }
      .icon {
        font-size: 24px;
        color: $light-5;
      }
    }
  }
}
</style>