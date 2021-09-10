<template>
  <div id="feedback" class="d-flex flex-jcc">
    <div class="feedback-box">
      <div class="title-xl">
        <span>快来提出你宝贵的建议吧！</span>
      </div>
      <div class="feedback-content d-flex flex-clo">
        <v-form ref="form">
          <v-text-field autocomplete="off" label="标题" background-color="info" solo v-model="form.title"
            :rules="rules.title" required>
          </v-text-field>
          <v-textarea label="说说你的想法..." background-color="info" solo v-model="form.content" maxlength="200"
            counter="200" rows="8" no-resize :rules="rules.content" required></v-textarea>
        </v-form>
      </div>
      <div class="feedback-footer d-flex flex-jcb">
        <div class="exp">
          <v-btn-toggle v-model="form.emoji" tile group borderless active-class="selected-exp">
            <v-btn v-for="(exp, index) in expList" :key="index" class="">
              <span class="title-xs">{{exp}}</span>
            </v-btn>
          </v-btn-toggle>
        </div>
        <v-btn color="primary" @click="submitSuggestion" :loading="loading">提交建议</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expList: ['😁', '😊', '😐', '😕', '😡'],
      form: {
        title: '',
        content: '',
        emoji: 0,
      },
      rules: {
        title: [
          (v) => !!v || '请填写标题！',
          (v) => (v && v.length <= 25) || '标题长度不能超过25个字符！',
        ],
        content: [(v) => !!v || '请填写建议内容！'],
      },
      loading: false,
    }
  },
  created() {
    this.$http.getFeedbacks().then((res) => {
      if (res.state) {
        this.$message.success('获取反馈成功！')
      }
    })
  },
  methods: {
    selectExp(index) {
      this.form.emoji = index
    },
    async submitSuggestion() {
      if (!this.validate()) return void 0
      this.loading = true
      try {
        const username = this.$store.state.loginState.username
        const res = await this.$http.sendFeedback({ ...this.form, username })
        if (res.state) {
          this.$message.success('反馈成功！')
          this.reset()
        } else {
          this.$message.error('反馈失败！')
        }
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
#feedback {
  padding: 60px 0 200px 0;
  .feedback-box {
    .feedback-content {
      margin-top: 40px;
    }
    .feedback-footer {
      .exp {
        height: 40px;
        padding: 0 15px;
        border-radius: 20px;
        background-color: $deep-4;
        box-shadow: $shadow-1;
        .v-btn {
          height: 36px;
          min-width: 36px;
          padding: 0;
          border-radius: 50%;
        }
      }
    }
  }
}

@include screenLG {
  #feedback {
    .feedback-box {
      width: 50%;
    }
  }
}
</style>
