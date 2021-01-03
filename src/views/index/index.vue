<template>
  <div>
    <!-- 会员页面 -->
    <div id="user-view" :class="{ open: showUser }">
      <router-view />
    </div>
    <!-- 底部操作栏 -->
    <Navbar />
    <!-- 汽车列表 -->
    <!-- <Cars /> -->
    <!-- 地图组件 -->
    <Amap />
  </div>
</template>

<script>
import Amap from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
export default {
  name: "Index",
  components: {
    Amap,
    Cars,
    Navbar,
  },
  data() {
    return {};
  },
  computed: {
    showUser() {
      return this.$route.name !== "Index" ? true : false;
    },
  },
  watch: {},
};
</script>

<style lang="scss">
#user-view {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -600px;
  z-index: 100;
  width: 410px;
  background-color: $color-main;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, 0.4));
  &.open {
    right: 0px;
  }
}
</style>
