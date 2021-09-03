<template>
  <v-card class="self-instance-card">
    <v-img
      src="https://assets.codepen.io/3364143/internal/screenshots/pens/ZEpxeYm.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1612345891&width=960"
      class="instance-card-img white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
      <div class="img-screen pointer d-flex flex-ai flex-jcc">
        <v-icon>mdi-eye</v-icon>
      </div>
    </v-img>
    <v-card-actions>
      <div class="instance-info d-flex flex-clo pointer">
        <span class="text-sm" title="123">瀑布流特效1111111111111111111111111111111111111111111111</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon class="icon-like">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <span class="liked-num text-xs">12.2k</span>
      <v-menu offset-y top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="icon-more" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <v-list class="works-menu">
          <v-list-item class="works-menu-list" v-for="item in menuList" :key="item.value" link
            @click="handleMenu(item.value)">
            <v-icon class="icon">{{item.icon}}</v-icon>
            {{item.name}}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
import { copyToClip } from '@utils/tools'

export default {
  data() {
    return {
      menuList: [
        {
          name: '设置',
          value: 'config',
          icon: 'mdi-cog',
        },
        {
          name: '分享',
          value: 'share',
          icon: 'mdi-share-variant',
        },
        {
          name: '删除',
          value: 'delete',
          icon: 'mdi-trash-can',
        },
      ],
    }
  },
  methods: {
    handleMenu(val) {
      switch (val) {
        case 'delete': {
          this.delete()
          break
        }
        case 'share': {
          this.shareLink()
          break
        }
        case 'config': {
          this.$store.commit('setVisibleDialogName', 'instanceConfig')
        }
      }
    },
    delete() {
      this.$alert({
        title: '删除实例',
        content: '实例将会在回收站内保存7天，7天后将永久删除，确认继续该操作么',
        okText: '确认并删除',
        okColor: 'error',
      }).then((res) => {
        if (res) {
          this.$message.success({ msg: '实例删除成功！' })
        } else {
          this.$message.error({ msg: '实例删除失败！' })
        }
      })
    },
    shareLink() {
      copyToClip('123')
      this.$message.success({ msg: '链接已复制到剪切板！' })
    },
  },
  components: {},
}
</script>

<style lang="scss">
.works-menu {
  .works-menu-list {
    color: $light-5 !important;
    @include setTransition(color, 0.3s, ease);
    .icon {
      color: inherit;
      margin-right: 15px;
    }
    &:hover {
      color: $light-1 !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.self-instance-card {
  width: 100%;
  .instance-card-img {
    height: 0;
    padding-bottom: 55%;
    position: relative;
    .img-screen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      @include setTransition(opacity, 0.3s, ease);
      &:hover {
        opacity: 1;
      }
    }
  }
  .instance-info {
    margin-left: 10px;
    width: calc(100% - 170px);
    span {
      display: block;
      @include text-ellipsis;
    }
  }
  .v-card__actions {
    height: 40px;
  }
  .liked-num {
    color: $light-4;
  }
  .icon-like,
  .icon-more {
    color: $light-7;
  }
  .icon-like {
    &:hover {
      color: $red-1;
    }
  }
  .icon-more {
    margin-left: 10px;
    &:hover {
      color: $light-2;
    }
  }
}
</style>
