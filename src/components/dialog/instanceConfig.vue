<template>
  <v-dialog id="instanceConfig" v-model="visible" max-width="500" @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-sm">实例设置</span>
      </v-card-title>
      <v-card-text>
        <v-form class="form d-flex flex-clo" ref="form">
          <span class="form-item-title">实例标题</span>
          <v-text-field class="form-item-input" solo v-model="form.title" label="填写实例标题..." background-color="info"
            :rules="rules.title">
          </v-text-field>
          <span class="form-item-title">实例标签</span>
          <span class="text-describe">添加或修改实例标签，标签最多三个，每个标签长度小于15</span>
          <v-combobox class="form-item-input" v-model="form.tags" :items="tagList" background-color="info" clearable
            multiple chips solo label="选择标签..." hide-selected :disable-lookup="form.tags.length>=3" @change="tagsChange"
            :rules="rules.tags">
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip v-bind="attrs" color="#1a1a1a" :input-value="selected" close @click="select"
                @click:close="removeTag(item)">
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="save-btn" color="primary" @click="saveConfig" :loading="loading" block>保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: 'instanceConfig',
      visible: false,
      form: {
        title: '',
        tags: [],
      },
      rules: {
        title: [(v) => !!v || '请填写实例标题！'],
        tags: [
          (v) => {
            console.log(v)
            for (let i = v.length - 1; i >= 0; i--) {
              console.log(v[i].length)
              if (v[i].length > 15) {
                return '每个标签长度不能大于15！'
              }
            }
            return true
          },
        ],
      },
      tagList: ['CSS', 'HTML', 'JS', 'cd'],
      loading: false,
    }
  },
  created() {
    this.form = {
      title: this.title,
      tags: this.tags,
    }
  },
  computed: {
    ...mapState(['visibleDialogName']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
    validate() {
      return this.$refs.form.validate()
    },
    saveConfig() {
      if (this.validate()) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.setVisibleDialogName('')
          this.$message.success({ msg: '实例设置修改成功！' })
        }, 3000)
      }
    },
    tagsChange(list) {
      const len = list.length
      if (len > 3) {
        this.removeTag(list[list.length - 1])
      }
    },
    removeTag(item) {
      const form = this.form
      form.tags.splice(form.tags.indexOf(item), 1)
      form.tags = [...form.tags]
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.form-item-input {
  margin-top: 10px;
}
</style>
