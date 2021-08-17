<template>
  <div id="footer" class="no-select">
    <div class="footer-content flex">
      <div class="side-info flex-1">
        <div class="logo flex flex-ai">
          <img class="logo-img" src="../assets/logo/logo.svg" alt="">
          <span class="logo-content">JS Encoder</span>
        </div>
        <div class="copyright-info flex flex-clo text-sm">
          <span class="copyright">Copyright © 2021 JS-Encoder lliiooiill</span>
          <span>黑ICP备19007665号-1</span>
        </div>
      </div>
      <div class="footer-menu flex">
        <ul class="menu-box" v-for="(curMenu, menuIndex) in footerMenu" :key="menuIndex">
          <li class="menu-title title-sm">{{curMenu.title}}</li>
          <li class="menu-item text-sm pointer" v-for="(item, index) in curMenu.children" :key="index">{{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerMenu: [
        {
          title: '产品',
          children: [
            {
              name: '新特性',
              route: '',
            },
            {
              name: '更新日志',
              route: '',
            },
            {
              name: '问题',
              route: '',
            },
          ],
        },
        {
          title: '关于',
          children: [
            {
              name: 'GitHub',
              route: '',
            },
            {
              name: '遵循协议',
              route: '',
            },
          ],
        },
        {
          title: '支持',
          children: [
            {
              name: '联系支持',
              route: '',
            },
            {
              name: '赞助',
              route: '',
            },
          ],
        },
      ],
    }
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss" scoped>
#footer {
  height: 300px;
  padding: 50px 100px;
  .footer-content {
    .side-info {
      .logo {
        .logo-img {
          width: 50px;
          height: 50px;
        }
        .logo-content {
          font-size: 24px;
          margin-left: 15px;
        }
      }
      .copyright-info {
        margin-top: 100px;
        color: $light-7;
        .copyright {
          margin-bottom: 10px;
        }
      }
    }
    .footer-menu {
      margin-top: 20px;
      .menu-box {
        min-width: 200px;
        .menu-title {
          margin-bottom: 20px;
        }
        .menu-item {
          margin-bottom: 15px;
          color: $light-3;
          &:hover {
            color: $light-2;
          }
        }
      }
    }
  }
}
</style>
