<template>
  <div class="user-container">
    <div class="user-info">
      <img src="@/assets/images/face.png" alt="" />
      <div class="meta">
        <h4 class="name">{{ usename }}</h4>
        <span>
          文明驾驶分
          <strong>0</strong>
        </span>
      </div>
    </div>
    <ul class="group-links">
      <router-link to="/my" class="arrow">
        <i class="icon icon-w-h-30 icon-user-my"></i>
        我的账户
      </router-link>
      <router-link to="/order" class="arrow">
        <i class="icon icon-w-h-30 icon-user-order"></i>
        租车订单
      </router-link>
      <router-link to="/authentication" class="arrow">
        <i class="icon icon-w-h-30 icon-user-authentication"></i>
        实名认证
      </router-link>
      <router-link to="/safe" class="arrow">
        <i class="icon icon-w-h-30 icon-user-safe"></i>
        安全设置
      </router-link>
      <router-link to="/" class="arrow">
        <i class="icon icon-w-h-30 icon-user-more"></i>
        帮助中心
      </router-link>
    </ul>
    <button class="logout" @click="logout">登出</button>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      usename: this.$store.state.account.username,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("account/logoutAction").then(() => {
        this.$message({
          type: "success",
          message: "已退出登录!!",
        });
        this.$router.replace({
          name: "Index",
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
