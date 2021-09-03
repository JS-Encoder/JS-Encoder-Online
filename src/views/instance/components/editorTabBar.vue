<template>
  <div id="editorTabBar" class="d-flex no-select">
    <div class="tab-list d-flex flex-1" ref="tabList">
      <div v-for="(item, index) in prep" :key="index" class="editor-tab d-flex flex-jcc flex-ai"
        :class="curTab === item ? 'active-tab' : ''" @click="setCurTab(item)">
        <i class="icon iconfont" :class="iconMap[item]"></i>{{ item }}
      </div>
    </div>
    <div class="tools d-flex flex-sh">
      <div class="d-flex flex-ai flex-jcc" v-if="curTab === 'Markdown'" @click="setMdToolbarVisible(!mdToolbarVisible)"
        :class="mdToolbarVisible?'active':''">
        <i class="icon iconfont icon-gongju1"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import WheelDirective from '@utils/editor/wheelDirective'
export default {
  data() {
    return {
      iconMap: {
        HTML: 'icon-html',
        Markdown: 'icon-markdown',
        Pug: 'icon-pug',
        CSS: 'icon-style',
        Less: 'icon-less',
        Sass: 'icon-Sass',
        Scss: 'icon-Sass',
        Stylus: 'icon-stylus',
        JavaScript: 'icon-javascript',
        TypeScript: 'icon-typescript',
        CoffeeScript: 'icon-coffeescript',
      },
    }
  },
  mounted() {
    new WheelDirective(this.$refs.tabList)
  },
  computed: {
    ...mapState(['prep', 'curTab', 'mdToolbarVisible']),
  },
  methods: {
    ...mapMutations(['setCurTab', 'setMdToolbarVisible']),
  },
  components: {},
}
</script>

<style lang="scss" scoped>
@include scrollBar();
#editorTabBar {
  width: 100%;
  height: 30px;
  background-color: $deep-3;
  .tab-list {
    width: 100%;
    overflow-y: hidden;
    overflow-x: overlay;
    position: relative;
    &::-webkit-scrollbar {
      outline: none;
      height: 4px;
      background-color: transparent;
      @include setTransition(all, 0.3s, ease);
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(30, 30, 30, 0);
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(80, 80, 80, 0.3);
    }
    &::-webkit-scrollbar-thumb:hover {
      outline: none;
      background-color: rgba(80, 80, 80, 0.7);
    }
    .editor-tab {
      padding: 0 20px;
      color: $light-5;
      background-color: $deep-2;
      font-size: 14px;
      font-family: $code;
      cursor: pointer;
      i {
        margin-right: 5px;
        font-size: 18px;
      }
      &:not(:first-child) {
        border-left: 1px solid $deep-5;
      }
      &:hover {
        color: $light-2;
      }
    }
    .active-tab {
      background-color: $deep-4;
      color: $light-2;
    }
  }
  .tools {
    font-size: 18px;
    color: $light-5;
    & > div {
      width: 40px;
      cursor: pointer;
      &:hover {
        color: $light-2;
      }
    }
    .active {
      color: $primary-1;
    }
  }
}
/* icon style */
.icon-html {
  color: $red-1;
}
.icon-markdown {
  color: $primary-1;
}
.icon-pug {
  color: $light-2;
}
.icon-style {
  color: $blue-1;
}
.icon-less {
  color: $light-2;
}
.icon-Sass {
  color: $pink-1;
}
.icon-stylus {
  color: $orange-1;
}
.icon-javascript {
  color: $warning-1;
}
.icon-typescript {
  color: $primary-1;
}
.icon-coffeescript {
  color: $pink-2;
}
</style>
