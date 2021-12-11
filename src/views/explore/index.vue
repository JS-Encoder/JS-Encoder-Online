<template>
  <div id="explore" class="d-flex flex-ai flex-clo">
    <go-to-top></go-to-top>
    <div class="explore-content">
      <div class="explore-search">
        <v-row>
          <v-col lg="6" md="8" sm="8" cols="12">
            <v-text-field class="search-keyword" ref="searchField" solo label="找找你想要的..." height="60" clearable
              hide-details v-model="searchForm.keyword" @keypress.enter="search">
              <template slot="append">
                <v-btn class="search-btn" color="primary" absolute x-large :disabled="!searchForm.keyword"
                  :loading="searchLoading" @click.stop="search">搜索</v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col lg="2" md="2" sm="2" cols="12">
            <v-btn height="60" x-large plain block :elevation="showFilter?5:0" @click="showFilter=!showFilter">
              <v-icon left>mdi-filter-variant</v-icon> 过滤
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-show="showFilter">
          <v-col lg="4" md="4" sm="6" cols="12">
            <span>预处理：</span>
            <v-select hide-details clearable solo v-model="searchForm.prep" :items="prepList"
              :menu-props="{ offsetY: true }" @change="newSearch">
            </v-select>
          </v-col>
          <v-col lg="4" md="4" sm="6" cols="12">
            <span>排序：</span>
            <v-select solo item-text="text" item-value="value" hide-details v-model="searchForm.sort"
              :menu-props="{ offsetY: true }" :items="sortList" @change="newSearch">
            </v-select>
          </v-col>
        </v-row>
      </div>
      <div class="find-tip flex-jcc" v-show="showNothingTip">
        <div class="tip-content d-flex flex-clo flex-ai">
          <span class="emoji">🧐</span>
          <span class="text-describe">哎呀，什么都没找到诶~~</span>
          <span class="text-describe">但我想，也许你可以为这里开拓一片新天地？</span>
        </div>
      </div>
      <!-- <div class="init-tip flex-jcc" v-show="!init">
        <div class="d-flex flex-jcc text-describe">
          <span>请在搜索框输入关键字寻找你想要的实例</span>
        </div>
      </div> -->
      <div v-show="!nothing">
        <div class="explore-instance-list">
          <div class="explore-list-item" v-for="(item, index) in instanceList" :key="item.exampleId">
            <instance-card :info="item" :cardIndex="index" @setFav="setFav"></instance-card>
          </div>
          <div class="skeleton-list-item" v-show="listLoading" v-for="(item, index) in 12" :key="index">
            <instance-skeleton></instance-skeleton>
          </div>
        </div>
        <div class="page-opt flex-jcc" v-show="!isFirstPage||!isLastPage">
          <v-btn class="before-btn" @click="switchPage(-1)" :disabled="isFirstPage">上一页</v-btn>
          <v-btn color="primary" class="after-btn" @click="switchPage(1)" :disabled="isLastPage">下一页</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InstanceSkeleton from '@components/skeleton/instanceSkeleton'
import InstanceCard from '@components/instanceCard'
import GoToTop from '@components/goToTop'
import { defPrepOpts } from '@utils/publicData'
import { judgeMode } from '@utils/editor/judgeMode'
import * as p2b from '@utils/paramsToBase64'
export default {
  name: 'Explore',
  provide() {
    return {
      setFollow: (isFollow, username) => {
        this.instanceList.forEach((item) => {
          console.log(item.username, username)
          if (item.username === username) {
            item.myFollow = isFollow
          }
        })
      },
    }
  },
  data() {
    return {
      sortList: Object.freeze([
        { text: '创建时间', value: 0 },
        { text: '更新日期', value: 1 },
        { text: '喜爱度', value: 2 },
      ]),
      prepList: [],
      searchForm: {
        keyword: '',
        prep: '',
        sort: 2,
      },
      page: 1,
      instanceList: [],
      nothing: false,
      showNothingTip: false,
      searchLoading: false,
      showFilter: false,
      listLoading: false,
      isLastPage: false,
      isFirstPage: false,
      init: false,
    }
  },
  created() {
    const prepList = this.prepList
    for (let key in defPrepOpts) {
      prepList.push(...defPrepOpts[key])
    }
    this.initData()
  },
  methods: {
    initData() {
      let page = 1
      let sort = 2
      let prep = ''
      let keyword = ''
      let f = this.$route.query.f
      if (f) {
        const {
          page: fPage,
          sort: fSort,
          prep: fPrep,
          keyword: fKeyword,
        } = p2b.decode(f)
        page = parseInt(fPage)
        sort = parseInt(fSort)
        keyword = fKeyword
        prep = fPrep
      }
      this.searchForm = { sort, prep, keyword }
      this.page = page
      this.getInstance()
    },
    newSearch() {
      // 重新从第一页开始搜索
      this.page = 1
      this.switchRoute()
    },
    switchPage(changeNum) {
      this.page += changeNum
      this.switchRoute()
    },
    switchRoute() {
      // 切换路由，如果没有name就只更新query查询信息
      const f = p2b.encode({ ...this.searchForm, page: this.page })
      if (this.$route.query.f !== f) {
        const routeObj = { name: 'Explore', query: { f } }
        this.$router
          .push(routeObj)
          .then(() => {
            this.getInstance()
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.getInstance()
      }
    },
    search() {
      this.$refs.searchField.blur()
      this.newSearch()
    },
    async getInstance() {
      try {
        const { keyword, sort, prep } = this.searchForm
        // if (keyword === '') return void 0
        // 每次改变条件或点击按钮查询都清空列表再查
        this.instanceList = []
        this.searchLoading = true
        this.listLoading = true
        this.nothing = false
        this.showNothingTip = false
        this.init = true
        const prepKey = judgeMode(prep)
        const res = await this.$http.searchWorksByContent({
          currentPage: this.page,
          queryContent: keyword || '',
          orderCondition: sort,
          htmlStyle: prepKey === 'HTML' ? prep : '',
          cssStyle: prepKey === 'CSS' ? prep : '',
          jsStyle: prepKey === 'JavaScript' ? prep : '',
        })
        if (res.state) {
          // this.$message.success('查询成功！')
          const { list, isLastPage, isFirstPage } = res.data
          this.nothing = list.length === 0
          this.showNothingTip = list.length === 0
          this.instanceList = list
          this.isFirstPage = isFirstPage
          this.isLastPage = isLastPage
        } else {
          this.nothing = true
          // this.$message.error('查询失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.searchLoading = false
      this.listLoading = false
    },
    setFav(isFav, index) {
      const item = this.instanceList[index]
      item.myFavorites = isFav
      item.favorites += isFav ? 1 : -1
    },
  },
  components: {
    InstanceSkeleton,
    InstanceCard,
    GoToTop,
  },
}
</script>
<style lang="scss">
.search-keyword {
  .v-input__slot {
    padding-right: 100px !important;
  }
}
</style>
<style lang="scss" scoped>
#explore {
  padding: 30px 0 100px 0;
  .explore-content {
    .find-tip {
      display: flex;
      padding: 50px 0 150px 0;
      .tip-content {
        padding: 25px 50px;
        border-radius: 5px;
        background-color: $deep-4;
        span {
          margin-bottom: 10px;
        }
        .emoji {
          font-size: 64px;
        }
      }
    }
    .init-tip {
      margin: 50px 0;
      padding: 30px 50px;
      background-color: $deep-3;
      border-radius: 10px;
    }
    .explore-search {
      .search-keyword {
        .search-btn {
          top: 4px;
          right: 4px;
        }
      }
    }
    .explore-instance-list {
      margin-top: 30px;
      display: grid;
      grid-gap: 30px;
    }
  }
  .page-opt {
    display: flex;
    margin-top: 50px;
    .before-btn {
      margin-right: 15px;
    }
  }
}

@include Mobile {
  #explore {
    padding: 50px 10px 0;
    .explore-content {
      .explore-instance-list {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
  }
}
@include screenSM {
  #explore .explore-content {
    width: 90%;
  }
}
@include screenMD {
  #explore {
    .explore-content {
      width: 95%;
      .explore-instance-list {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
  }
}
@include screenLG {
  #explore {
    .explore-content {
      width: 90%;
      .explore-instance-list {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
  }
}
@include screenXL {
  #explore {
    .explore-content {
      width: 90%;
      .explore-instance-list {
        grid-template-columns: repeat(4, minmax(300px, 1fr));
      }
    }
  }
}
</style>
