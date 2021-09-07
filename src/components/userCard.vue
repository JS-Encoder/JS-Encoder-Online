<template>
  <v-card class="user-card d-flex">
    <div class="avatar">
      <v-avatar size="50" class="pointer" color="primary">
        <!-- <img :src="avatar" alt="John"> -->
        <span class="white--text text-h6">li</span>
      </v-avatar>
      <v-spacer></v-spacer>
    </div>
    <div class="user-info flex-1 d-flex">
      <div class="d-flex flex-clo info-text">
        <span class="username text-md">{{username}}</span>
        <span class="about text-describe text-xs">{{about}}</span>
      </div>
      <v-btn color="info">
        <v-icon left>mdi-plus</v-icon>关注
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/john.jpg',
    },
    username: {
      type: String,
      default: 'lliiooiill',
    },
    about: {
      type: String,
      default: '这是我的描述...这是我的描述这是我的描述这是我的描述这是我的描述',
    },
  },
  data() {
    return {}
  },
  methods: {},
  components: {},
}
</script>

<style lang="scss" scoped>
.user-card {
  width: 345px;
  // height: 100px;
  padding: 15px;
  background-color: rgba(39, 39, 39, 0.3) !important;
  backdrop-filter: blur(5px);
  .user-info {
    width: 100%;
    margin-left: 15px;
    .info-text {
      width: calc(100% - 165px);
      margin-right: 15px;
      .username {
        display: block;
        @include text-ellipsis;
      }
      .about {
        margin-top: 5px;
        display: block;
        @include text-ellipsis;
      }
    }
    // .num {
    //   margin-top: 5px;
    //   .instances {
    //     margin-right: 10px;
    //   }
    // }
  }
}
</style>
