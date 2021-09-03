<template>
  <v-dialog id="instanceConfig" v-model="visible" max-width="500" @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-sm">实例设置</span>
      </v-card-title>
      <v-card-text>
        <v-form class="form" ref="form">
          <span class="form-item-title">实例标题</span>
          <v-text-field solo v-model="form.title" label="填写实例标题..." background-color="info" :rules="rules.title">
          </v-text-field>
          <span class="form-item-title">实例标签</span>
          <v-combobox v-model="form.tags" :items="tagList" background-color="info" clearable multiple chips solo
            hide-selected label="选择标签..." hide-details>
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="removeTag(item)">
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
      },
      tagList: ['CSS', 'HTML', 'JS'],
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
.form-item-title {
  display: inline-block;
  margin-bottom: 10px;
}
.save-btn {
  margin-top: 20px;
}
</style>
