<template>
  <div id="footer" class="no-select" v-once>
    <div class="footer-content d-flex">
      <div class="side-info flex-1">
        <div class="logo d-flex flex-ai">
          <img class="logo-img" src="../assets/logo/logo.svg" alt="">
          <span class="logo-content">JS Encoder</span>
        </div>
        <div class="copyright-info d-flex flex-clo text-sm">
          <span class="copyright">Copyright © 2021 JS-Encoder lliiooiill</span>
          <span>黑ICP备19007665号-1</span>
        </div>
      </div>
      <div class="footer-menu d-flex">
        <ul class="menu-box" v-for="(curMenu, menuIndex) in footerMenu" :key="menuIndex">
          <li class="menu-title title-sm">{{curMenu.title}}</li>
          <li class="menu-item text-sm pointer" v-for="(item, index) in curMenu.children" :key="index"
            @click="handleFooterLink(item.name)">{{item.text}}
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
      footerMenu: Object.freeze([
        {
          title: '产品',
          children: [
            {
              text: '新特性',
              name: 'Feature',
            },
            {
              text: '更新日志',
              name: 'Log',
            },
            {
              text: '问题',
              name: 'Issues',
            },
          ],
        },
        {
          title: '关于',
          children: [
            {
              text: 'GitHub',
              name: 'GitHub',
            },
            {
              text: '遵循协议',
              name: 'License',
            },
          ],
        },
        {
          title: '支持',
          children: [
            {
              text: '联系支持',
              name: 'Email',
            },
            {
              text: '赞助',
              name: 'Sponsor',
            },
          ],
        },
      ]),
    }
  },
  methods: {
    handleFooterLink(name) {
      switch (name) {
        case 'Feature': {
          this.$router.push({ name: 'Feature' })
          break
        }
        case 'Log': {
          window.open(
            'https://github.com/Longgererer/JS-Encoder-Online/releases'
          )
          break
        }
        case 'Issues': {
          window.open('https://github.com/Longgererer/JS-Encoder-Online/issues')
          break
        }
        case 'GitHub': {
          window.open('https://github.com/Longgererer/JS-Encoder-Online')
          break
        }
        case 'License': {
          window.open(
            'https://github.com/Longgererer/JS-Encoder-Online/blob/main/LICENSE'
          )
          break
        }
        case 'Email': {
          const a = document.createElement('a')
          a.href = 'mailto:c2b139460q@163.com'
          a.click()
          break
        }
        case 'Sponsor': {
          break
        }
      }
    },
  },
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

@include Mobile {
  #footer {
    height: auto;
    padding: 50px 0;
    .footer-content {
      flex-direction: column-reverse;
      align-items: center;
      .footer-menu {
        width: 100%;
        justify-content: space-around;
        .menu-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      .side-info {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .copyright-info {
          margin-top: 25px;
        }
      }
    }
  }
}
@include screenMD {
  .menu-box {
    min-width: 150px;
  }
}
@include screenLG {
  .menu-box {
    min-width: 200px;
  }
}
@include screenXL {
  .menu-box {
    min-width: 300px;
  }
}
</style>
