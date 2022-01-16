<template>
  <v-dialog
    id="templates"
    v-model="visible"
    max-width="500"
    @click:outside="closeDialog"
    content-class="templates-dialog"
  >
    <v-card>
      <v-card-title>
        <span class="title-xs">模板</span>
      </v-card-title>
      <v-card-text>
        <div class="templates d-flex flex-clo">
          <span class="temp-title">选择你的模板(这可能会覆盖你当前实例的代码和外部链接)</span>
          <div class="template-list">
            <div
              class="template pointer d-flex flex-clo flex-ai flex-jcc"
              v-for="template in templateList"
              :key="template.label"
              @click="selectTemplate(template.label)"
            >
              <img :src="`/images/${template.svgName}.svg`" :alt="template.label" />
              <span class="name">{{ template.label }}</span>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      name: 'templates',
      visible: false,
      publicPath: process.env.BASE_URL,
      templatesInfo: {
        Vanilla: {
          preprocessor: ['HTML', 'CSS', 'JavaScript'],
          links: {
            cssLinks: [],
            JSLinks: []
          },
          code: {
            HTML: '<h1>This is a template of Vanilla!</h1>',
            CSS: '',
            JavaScript: ''
          }
        },
        Vue2: {
          preprocessor: ['HTML', 'CSS', 'JavaScript'],
          links: {
            cssLinks: [],
            JSLinks: ['https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js']
          },
          code: {
            HTML: '<div id=\"app\">\n\t{{ message }}\n</div>',
            CSS: '',
            JavaScript: `var app = new Vue({\n\tel: '#app',\n\tdata: {\n\t\tmessage: 'This is a template of Vue2!'\n\t}\n})`
          }
        },
        Vue3: {
          preprocessor: ['HTML', 'CSS', 'JavaScript'],
          links: {
            cssLinks: [],
            JSLinks: ['https://unpkg.com/vue@next']
          },
          code: {
            HTML: '<div id=\"app\">\n\t{{message}}\n</div>',
            CSS: '',
            JavaScript: `const app = {\n\tdata() {\n\t\treturn {\n\t\t\tmessage: 'This is a template of Vue3!'\n\t\t}\n\t}\n}\n\nVue.createApp(app).mount('#app')`
          }
        },
        React: {
          preprocessor: ['HTML', 'CSS', 'JSX'],
          links: {
            cssLinks: [],
            JSLinks: [
              'https://unpkg.com/react@17/umd/react.development.js',
              'https://unpkg.com/react-dom@17/umd/react-dom.development.js'
            ]
          },
          code: {
            HTML: '<div id=\"root\">\n\t{{message}}\n</div>',
            CSS: '',
            JavaScript: `ReactDOM.render(\n\t<h1>This is a template of React!</h1>,\n\tdocument.getElementById('root')\n);`
          }
        },
        Angular: {
          preprocessor: ['HTML', 'CSS', 'JavaScript'],
          links: {
            cssLinks: [],
            JSLinks: ['https://unpkg.com/angular@1.8.2/angular.js']
          },
          code: {
            HTML: `<div ng-app="myApp" ng-controller="myCtrl">\n\t{{message}}\n</div>`,
            CSS: '',
            JavaScript: `var app = angular.module('myApp', [])\napp.controller('myCtrl', function ($scope) {\n\t$scope.message = 'This is a template of Angular'\n})`
          }
        },
      },
      templateList: [
        { label: 'Vanilla', svgName: 'Vanilla' },
        { label: 'Vue2', svgName: 'Vue' },
        { label: 'Vue3', svgName: 'Vue' },
        { label: 'React', svgName: 'React' },
        { label: 'Angular', svgName: 'Angular' },
      ]
    }
  },
  computed: {
    ...mapState(['visibleDialogName']),
  },
  watch: {
    visibleDialogName (name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations([
      'setVisibleDialogName',
      'setAllPrep',
      'setCurTab',
      'setAllInstanceExtLinks',
      'setInstancesCode',
      'setShouldResetCode'
    ]),
    closeDialog () {
      this.setVisibleDialogName('')
    },
    selectTemplate (template) {
      const { preprocessor, links, code } = this.templatesInfo[template]
      this.setAllPrep(preprocessor)
      this.setCurTab(preprocessor[0])
      this.setAllInstanceExtLinks(links)
      this.setInstancesCode(code)
      this.setShouldResetCode(true)
      this.closeDialog()
    }
  }
}
</script>

<style lang="scss">
.templates-dialog {
  .temp-title {
    color: $light-2;
    margin-top: 5px;
  }
  .templates {
    .template-list {
      margin-top: 15px;
      display: grid;
      grid-template-columns: repeat(4, 100px);
      grid-template-rows: repeat(2, 120px);
      gap: 15px;
      .template {
        border-radius: 4px;
        color: $light-4;
        background-color: $deep-3;
        transition: all 0.2s ease;
        img {
          width: 50px;
        }
        .name {
          margin-top: 10px;
        }
        &:hover {
          background-color: $primary-2;
          color: $light-2;
        }
      }
    }
  }
}
</style>
