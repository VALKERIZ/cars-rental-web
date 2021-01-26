<template>
  <div class="header-back">
    <header class="nav-header">
      <div class="back" @click="goBack">
        <i class="icon"></i>
        <h4 class="title">{{ title }}</h4>
      </div>
      <div class="right-wrap">
        <slot name="navHeaderRight"></slot>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "Back",
  computed: {
    title() {
      return this.$store.state.app.routerName; // 如果要监听某个变量的数据变化，只需要放置变量在computed对象里即可
    },
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
