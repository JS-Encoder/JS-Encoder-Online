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
          <v-btn-toggle v-model="form.exp" tile group borderless active-class="selected-exp">
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
        exp: 0,
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
  methods: {
    selectExp(index) {
      this.form.exp = index
    },
    submitSuggestion() {
      if (this.validate()) {
        this.loading = true
        setTimeout(() => {
          this.$store.dispatch('snackbar/openSnackbar', {
            msg: '发送成功！',
            style: 'success',
          })
          this.loading = false
          this.reset()
        }, 3000)
      }
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
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
