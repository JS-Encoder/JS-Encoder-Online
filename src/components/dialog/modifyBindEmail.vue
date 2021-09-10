<template>
  <v-dialog id="modifyBindEmail" v-model="visible" max-width="500" @click:outside="close">
    <v-card>
      <v-card-title>
        <span class="title-sm">修改绑定邮箱</span>
      </v-card-title>
      <v-card-text>
        <v-form class="form d-flex flex-clo" ref="form">
          <v-text-field label="邮箱" placeholder="修改后的邮箱" outlined color="primary" v-model="form.email"
            :rules="rules.email"></v-text-field>
          <v-text-field label="密码" placeholder="当前账户密码" autocomplete="new-password"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'" :type="showPwd ? 'text' : 'password'"
            @click:append="showPwd = !showPwd" outlined color="primary" v-model="form.password" :rules="rules.password">
          </v-text-field>
          <v-btn @click="modify" block x-large color="primary" :loading="loading">修改邮箱</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import regexpList from '@utils/regexp'
export default {
  data() {
    return {
      name: 'modifyBindEmail',
      showPwd: false,
      visible: true,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          (v) => !!v || '请填写邮箱！',
          (v) => (v && this.isEmailRight) || '请填写正确的邮箱！',
        ],
        password: [(v) => !!v || '请填写密码！'],
      },
      loading: false,
    }
  },
  computed: {
    ...mapState(['visibleDialogName', 'curUserDetail']),
    isEmailRight() {
      return regexpList.email.test(this.form.email)
    },
  },
  watch: {
    visibleDialogName(name) {
      this.visible = this.name === name
    },
  },
  methods: {
    ...mapMutations(['setVisibleDialogName', 'setCurUserDetail']),
    validate() {
      return this.$refs.form.validate()
    },
    async modify() {
      if (!this.validate()) return void 0
      this.loading = true
      try {
        const res = await this.$http.modifyBindEmail({
          username: this.curUserDetail.username,
          ...this.form,
        })
        if (res.state) {
          this.setCurUserDetail({ email: this.form.email })
          this.close()
          this.$router.replace({ name: 'Login' })
          this.$message.success('邮箱修改成功，请重新登录！')
        } else {
          this.$message.error('邮箱修改失败！')
        }
      } catch (err) {
        console.log(err)
      }
    },
    close() {
      this.form = {
        email: '',
        password: '',
      }
      this.$refs.form.resetValidation()
      this.setVisibleDialogName('')
    },
  },
  components: {},
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 25px;
}
</style>
