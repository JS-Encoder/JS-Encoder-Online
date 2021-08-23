<template>
  <div id="features" class="d-flex flex-jcc">
    <div class="feature-list" v-if="!loading">
      <v-expansion-panels focusable hover popout>
        <v-expansion-panel v-for="(item, index) in release" :key="index">
          <v-expansion-panel-header color="#1E1E1E" hide-actions>
            <template>
              <div class="d-flex">
                <div class="d-flex flex-clo flex-start">
                  <div class="title-xs">
                    <span>JS Encoder</span>
                    <span class="text-primary">　{{item.tag_name}}　</span>
                    <span>更新事项</span>
                  </div>
                  <div class="text-sm" style="color:#999999">
                    <span>By {{item.author.login}}</span>
                  </div>
                </div>
                <v-btn icon absolute right @click.native.stop="jumpTo(item.html_url)">
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </div>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <pre style="padding: 15px 0;">{{item.body}}</pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import localStorage from '@utils/local-storage'
export default {
  data() {
    return {
      loading: true,
      release: [],
    }
  },
  created() {
    this.getRelease()
  },
  methods: {
    getRelease() {
      // 获取仓库版本列表和详情
      this.$http.repoRelease().then((res) => {
        this.loading = false
        this.release = res
        // 将用户看到的最新版本存入localStorage中
        localStorage.set('latestViewVersion', res[0].tag_name)
      })
    },
    jumpTo(url) {
      window.open(url)
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#features {
  padding: 100px 0 200px 0;
  .feature-list {
    opacity: 0;
    @include animation(fade-bottom, 0.3s, 0.3s, ease, forwards);
  }
}
@include screenLG {
  #features {
    min-height: 100vh;
    .feature-list {
      width: 50%;
    }
  }
}
</style>
