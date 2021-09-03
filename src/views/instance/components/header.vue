<template>
  <div id="instanceHeader" class="d-flex borbox">
    <div class="logo d-flex flex-ai flex-jcc flex-sh pointer">
      <router-link to="/" class="d-flex">
        <img src="../../../assets/logo/logo.svg" alt="" />
      </router-link>
    </div>
    <div class="instance-name flex-sh pointer d-flex flex-ai">
      <span class="inblock text-small">这是实例名</span>
      <v-btn icon small @click="setVisibleDialogName('instanceConfig')">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-ai">
      <div class="btn-opts">
        <v-btn color="#2a53cd" disabled class="radius-2" small depressed @click="saveInstance"
          :loading="saveInstanceLoading">
          <v-icon left dark>
            mdi-cloud-upload
          </v-icon>
          保存
        </v-btn>
        <v-btn small color="info" class="radius-2" depressed @click="like" :loading="likeLoading">
          <v-icon left small color="red">mdi-heart</v-icon>
          已喜爱
        </v-btn>
      </div>
      <header-account dense></header-account>
    </div>
    <instance-config></instance-config>
  </div>
</template>

<script>
import HeaderAccount from '@components/headerAccount.vue'
import InstanceConfig from '@components/dialog/instanceConfig.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      saveInstanceLoading: false,
      likeLoading: false
    }
  },
  methods: {
    ...mapMutations(['setVisibleDialogName']),
    saveInstance() {
      this.saveInstanceLoading = true
      setTimeout(() => {
        this.saveInstanceLoading = false
        this.$message.success({
          msg: '实例保存成功！',
        })
      }, 3000)
    },
    like(){
      this.likeLoading = true
    }
  },
  components: {
    HeaderAccount,
    InstanceConfig,
  },
}
</script>

<style lang="scss" scoped>
#instanceHeader {
  width: 100%;
  height: 41px;
  background-color: $deep-2;
  border-bottom: 1px solid $deep-5;
  position: relative;
  .logo {
    width: 40px;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .instance-name {
    color: $light-5;
    margin-left: 20px;
  }
  .btn-opts {
    margin-right: 15px;
    button {
      margin-right: 5px;
    }
  }
}
</style>
