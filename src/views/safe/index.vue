<template>
  <div class="user-container">
    <Back />
    <ul class="group-links">
      <router-link to="/reset" class="arrow">
        <i class="icon icon-w-h-30 icon-safe-reset"></i>
        修改登录密码
      </router-link>
      <router-link to="/bankcard" class="arrow">
        <i class="icon icon-w-h-30 icon-safe-bankcard"></i>
        银行卡
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Safe",
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
