<template>
  <v-dialog id="instanceConfig" max-width="500" v-model="visible" @click:outside="setVisibleDialogName('')">
    <v-card>
      <v-card-title>
        <span class="title-sm">实例设置</span>
      </v-card-title>
      <v-card-text style="padding-bottom:0">
        <v-form class="form d-flex flex-clo" ref="form">
          <span class="form-item-title">实例标题</span>
          <v-text-field class="form-item-input" solo label="填写实例标题..." background-color="info" v-model="form.title"
            :rules="rules.title">
          </v-text-field>
          <span class="form-item-title">实例标签</span>
          <span class="text-describe">添加或修改实例标签，标签最多三个，每个标签长度小于15</span>
          <v-combobox class="form-item-input" background-color="info" clearable multiple chips solo label="添加实例标签..."
            hide-selected v-model="form.tags" :items="tagList" :disable-lookup="form.tags.length>=3" :rules="rules.tags"
            @change="tagsChange">
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip color="#1a1a1a" close v-bind="attrs" :input-value="selected" @click="select"
                @click:close="removeTag(item)">
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>
          <span class="form-item-title">公共性</span>
          <span class="text-describe">将实例设置为私有，其他人将不会访问到你的实例。但每位用户最多只能有5个私有实例</span>
          <v-radio-group v-model="form.ispublic" row mandatory>
            <v-radio label="公共" :value="true"></v-radio>
            <v-radio label="私有" :value="false"></v-radio>
          </v-radio-group>
        </v-form>
      </v-card-text>
      <v-card-actions style="padding-bottom:20px">
        <v-btn class="save-btn" color="primary" block :loading="loading" @click="saveConfig">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      name: 'instanceConfig',
      visible: false,
      form: {
        title: '',
        tags: [],
        ispublic: true,
      },
      rules: {
        title: [(v) => !!v || '请填写实例标题！'],
        tags: [
          (v) => {
            for (let i = v.length - 1; i >= 0; i--) {
              if (v[i].length > 15) {
                return '每个标签长度不能大于15！'
              }
            }
            return true
          },
        ],
      },
      tagList: [],
      loading: false,
    }
  },
  created() {
    const { title, tags, ispublic } = this.curInstanceDetail
    this.form = {
      title,
      tags: tags ? tags.split(',') : [],
      ispublic,
    }
  },
  computed: {
    ...mapState(['visibleDialogName', 'curInstanceDetail']),
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setCurInstanceDetail']),
    validate() {
      return this.$refs.form.validate()
    },
    async saveConfig() {
      if (!this.validate()) return void 0
      this.loading = true
      try {
        const { title, tags, ispublic } = this.form
        const { id, ispublic: oldIspublic } = this.curInstanceDetail
        const reqObj = {
          exampleId: id,
          label: tags.toString(),
          exampleName: title,
        }
        if (ispublic !== oldIspublic) {
          reqObj.ispublic = ispublic
        }
        const res = await this.$http.configWork(reqObj)
        if (res.state) {
          this.setVisibleDialogName('')
          this.setCurInstanceDetail({ title, tags: tags.toString() })
          this.$message.success('实例设置修改成功！')
        } else {
          switch (res.msg) {
            case 1: {
              this.$message.error('私有实例已达上限！')
              break
            }
            default: {
              this.$message.error('实例设置修改失败！')
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
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
}
</script>

<style lang="scss" scoped>
.form-item-input {
  margin-top: 10px;
}
</style>
