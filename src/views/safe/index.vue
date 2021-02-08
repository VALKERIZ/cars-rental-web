<template>
  <div class="user-container">
    <Back />
    <ul class="group-links">
      <router-link to="/reset" class="arrow">
        修改登录密码
      </router-link>
      <router-link to="capital" class="arrow">
        设置资金密码
      </router-link>
      <!-- <router-link to="aa" class="arrow">
        绑定手机号
      </router-link> -->
      <router-link to="/bank" class="arrow">
        绑定银行卡
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
