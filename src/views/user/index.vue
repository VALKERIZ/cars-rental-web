<template>
  <div class="user-container">
    <div class="user-info">
      <img src="@/assets/images/face.png" alt="" />
      <div class="meta">
        <h4 class="name">4674683521564897</h4>
        <span>
          文明驾驶分
          <strong>0</strong>
        </span>
      </div>
    </div>
    <ul class="group-links">
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-w-h-30 icon-user-link-001"></i>
        我的账户
      </router-link>
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-w-h-30 icon-user-link-002"></i>
        租车订单
      </router-link>
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-w-h-30 icon-user-link-003"></i>
        实名认证
      </router-link>
      <router-link to="/safe" tag="a" class="arrow">
        <i class="icon icon-w-h-30 icon-user-link-safe"></i>
        安全设置
      </router-link>
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-w-h-30 icon-user-link-005"></i>
        帮助中心
      </router-link>
    </ul>
    <button class="logout">登出</button>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
