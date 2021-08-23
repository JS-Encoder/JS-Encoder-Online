<template>
  <v-card class="instance-card">
    <v-img
      src="https://assets.codepen.io/3364143/internal/screenshots/pens/ZEpxeYm.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1612345891&width=960"
      class="instance-card-img white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
      <div class="img-screen pointer d-flex flex-ai flex-jcc">
        <v-icon>mdi-eye</v-icon>
      </div>
    </v-img>
    <v-card-actions>
      <v-menu transition="none" :close-on-content-click="false" offset-y open-delay="500" close-delay="200" :open-on-hover="true" top>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="40" class="pointer" v-bind="attrs" v-on="on">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
          </v-avatar>
        </template>
        <user-card></user-card>
      </v-menu>
      <div class="instance-info d-flex flex-clo pointer">
        <span class="text-sm" title="123">瀑布流特效1111111111111111111111111111111111111111111111</span>
        <span class="text-xs text-describe">By lliiooiill</span>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon class="icon-like">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon class="icon-share">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserCard from '@components/userCard'
export default {
  props: {},
  data() {
    return {}
  },
  methods: {},
  components: {
    'user-card': UserCard,
  },
}
</script>

<style lang="scss" scoped>
.instance-card {
  width: 100%;
  .instance-card-img {
    height: 0;
    padding-bottom: 55%;
    position: relative;
    .img-screen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      @include setTransition(opacity, 0.3s, ease);
      &:hover {
        opacity: 1;
      }
    }
  }
  .instance-info {
    margin-left: 10px;
    width: calc(100% - 150px);
    span {
      display: block;
      @include text-ellipsis;
    }
  }
  .icon-like,
  .icon-share {
    color: $light-7;
  }
  .icon-like {
    &:hover {
      color: $red-1;
    }
  }
  .icon-share {
    &:hover {
      color: $pink-1;
    }
  }
}
</style>
