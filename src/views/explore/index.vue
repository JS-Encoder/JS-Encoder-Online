<template>
  <div id="explore" class="d-flex flex-ai flex-clo">
    <go-to-top></go-to-top>
    <div class="explore-content">
      <div class="explore-search">
        <v-row>
          <v-col lg="6" md="8" sm="8" cols="12">
            <v-text-field ref="searchField" solo label="找找你想要的..." height="60" class="search-keyword" clearable
              hide-details>
              <template slot="append">
                <v-btn @click.stop="search" :loading="searchLoading" color="primary" class="search-btn" absolute
                  x-large>搜索</v-btn>
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
            <span>标签：</span>
            <v-combobox v-model="searchForm.tags" :items="tagList" clearable multiple chips solo hide-selected
              label="选择标签..." hide-details>
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeTag(item)">
                  <strong>{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
          <v-col lg="4" md="4" sm="6" cols="12">
            <span>排序：</span>
            <v-select :items="sortList" solo :menu-props="{ offsetY: true }" v-model="searchForm.sort" hide-details>
            </v-select>
          </v-col>
        </v-row>
      </div>
      <div class="find-tip flex-jcc" v-show="!instanceList.length">
        <div class="tip-content d-flex flex-clo flex-ai">
          <span class="emoji">🧐</span>
          <span class="text-describe">哎呀，什么都没找到诶~~</span>
          <span class="text-describe">但我想，也许你可以为这里开拓一片新土地？</span>
        </div>
      </div>
      <div v-show="instanceList.length">
        <div class="explore-instance-list" v-show="listLoading">
          <div class="explore-list-item" v-for="(item, index) in 12" :key="index">
            <instance-card></instance-card>
          </div>
          <div class="skeleton-list-item" v-for="(item, index) in 12" :key="`sk-${index}`">
            <instance-skeleton></instance-skeleton>
          </div>
        </div>
        <div class="view-more d-flex flex-jcc">
          <v-btn color="info" x-large>
            <v-icon left>mdi-eye-outline</v-icon>查看更多
          </v-btn>
        </div>
        <div class="no-more-tip flex-jcc">
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
export default {
  data() {
    return {
      sortList: ['喜爱度', '更新日期', '创建时间'],
      tagList: ['HTML', 'CSS', 'JavaScript'],
      searchForm: {
        keyword: '',
        tags: [],
        sort: null,
      },
      instanceList: [1],
      searchLoading: false,
      showFilter: false,
      listLoading: true,
    }
  },
  created() {
    this.searchForm.sort = this.sortList[0]
  },
  methods: {
    removeTag(item) {
      const form = this.searchForm
      form.tags.splice(form.tags.indexOf(item), 1)
      form.tags = [...form.tags]
    },
    search() {
      this.$refs.searchField.blur()
      this.searchLoading = true
      // 查询实例列表
      setTimeout(() => {
        this.searchLoading = false
      }, 3000)
    },
  },
  components: {
    'instance-skeleton': InstanceSkeleton,
    'instance-card': InstanceCard,
    'go-to-top': GoToTop,
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
        .emoji{
          font-size: 64px;
        }
      }
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
      margin-top: 35px;
    }
    .no-more-tip{
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
