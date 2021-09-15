<template>
  <div id="explore" class="d-flex flex-ai flex-clo">
    <go-to-top></go-to-top>
    <div class="explore-content">
      <div class="explore-search">
        <v-row>
          <v-col lg="6" md="8" sm="8" cols="12">
            <v-text-field ref="searchField" solo label="找找你想要的..." height="60" class="search-keyword" clearable
              hide-details v-model="searchForm.keyword" @keypress.enter="search">
              <template slot="append">
                <v-btn @click.stop="search" :loading="searchLoading" color="primary" class="search-btn" absolute x-large
                  :disabled="!searchForm.keyword">搜索</v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col lg="2" md="2" sm="2" cols="12">
            <v-btn height="60" x-large :elevation="showFilter?5:0" plain @click="showFilter=!showFilter" block>
              <v-icon left>mdi-filter-variant</v-icon> 过滤
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-show="showFilter">
          <v-col lg="4" md="4" sm="6" cols="12">
            <span>预处理：</span>
            <v-select :items="prepList" clearable solo :menu-props="{ offsetY: true }" v-model="searchForm.prep"
              hide-details @change="search">
            </v-select>
            <!-- <v-combobox v-model="searchForm.tags" :items="tagList" clearable multiple chips solo hide-selected
              label="选择标签..." hide-details>
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeTag(item)">
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox> -->
          </v-col>
          <v-col lg="4" md="4" sm="6" cols="12">
            <span>排序：</span>
            <v-select :items="sortList" solo :menu-props="{ offsetY: true }" v-model="searchForm.sort" item-text="text"
              item-value="value" hide-details @change="search">
            </v-select>
          </v-col>
        </v-row>
      </div>
      <div class="find-tip flex-jcc" v-show="init&&nothing&&!instanceList.length">
        <div class="tip-content d-flex flex-clo flex-ai">
          <span class="emoji">🧐</span>
          <span class="text-describe">哎呀，什么都没找到诶~~</span>
          <span class="text-describe">但我想，也许你可以为这里开拓一片新天地？</span>
        </div>
      </div>
      <div class="init-tip flex-jcc" v-show="!init">
        <div class="d-flex flex-jcc text-describe">
          <span>请在搜索框输入关键字寻找你想要的实例</span>
        </div>
      </div>
      <div v-show="init&&!nothing">
        <div class="explore-instance-list">
          <div class="explore-list-item" v-for="item in instanceList" :key="item.exampleId">
            <instance-card :info="item"></instance-card>
          </div>
          <div class="skeleton-list-item" v-for="(item, index) in 12" :key="index" v-show="listLoading">
            <instance-skeleton></instance-skeleton>
          </div>
        </div>
        <div class="view-more flex-jcc" v-show="!isLastPage&&instanceList.length">
          <v-btn color="info" x-large @click="searchMore">
            <v-icon left>mdi-eye-outline</v-icon>查看更多
          </v-btn>
        </div>
        <div class="no-more-tip flex-jcc" v-show="isLastPage&&instanceList.length">
          <span class="text-describe text-sm">别划了，真的一个也没有了😥</span>
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
export default {
  name: 'Explore',
  data() {
    return {
      sortList: [
        { text: '创建时间', value: 0 },
        { text: '更新日期', value: 1 },
        { text: '喜爱度', value: 2 },
      ],
      prepList: [],
      searchForm: {
        keyword: '',
        prep: '',
        sort: 0,
      },
      instanceList: [],
      nothing: false,
      searchLoading: false,
      showFilter: false,
      listLoading: false,
      page: 1,
      isLastPage: false,
      init: false,
    }
  },
  created() {
    const prepList = this.prepList
    for (let key in defPrepOpts) {
      prepList.push(...defPrepOpts[key])
    }
  },
  methods: {
    // removeTag(item) {
    //   const form = this.searchForm
    //   form.tags.splice(form.tags.indexOf(item), 1)
    //   form.tags = [...form.tags]
    // },
    searchMore() {
      this.page++
      this.getInstance()
    },
    search() {
      this.$refs.searchField.blur()
      // 每次改变条件或点击按钮查询都清空列表再查
      this.instanceList = []
      this.page = 1
      this.getInstance()
    },
    async getInstance() {
      try {
        const { keyword, sort, prep } = this.searchForm
        if (keyword === '') return void 0
        this.searchLoading = true
        this.listLoading = true
        this.nothing = false
        this.init = true
        const prepKey = judgeMode(prep)
        const res = await this.$http.searchWorksByContent({
          currentPage: this.page,
          queryContent: keyword,
          orderCondition: sort,
          htmlStyle: prepKey === 'HTML' ? prep : '',
          cssStyle: prepKey === 'CSS' ? prep : '',
          jsStyle: prepKey === 'JavaScript' ? prep : '',
        })
        if (res.state) {
          this.$message.success('查询成功！')
          const { list, isLastPage } = res.data
          this.nothing = list.length === 0
          this.instanceList.push(...list)
          this.isLastPage = isLastPage
        } else {
          this.nothing = true
          this.$message.error('查询失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.searchLoading = false
      this.listLoading = false
    },
  },
  components: {
    InstanceSkeleton,
    InstanceCard,
    GoToTop,
  },
  beforeRouteLeave (to, from, next) {
    if (from.name === 'Explore' && to.name !== 'Work') {
      this.$destroy()
    }
    next()
  }
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
      .skeleton-list-item {
      }
    }
    .view-more {
      display: flex;
      margin-top: 35px;
    }
    .no-more-tip {
      padding: 50px 0;
      display: flex;
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
