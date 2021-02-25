<template>
  <div class="user-container">
    <Back />
    <img :src="img" alt="" class="level-img" />
    <section class="section-mode">
      <header>
        <h4 class="title">当前余额</h4>
      </header>
      <div class="content">
        <div class="clearfix">
          <div class="price pull-left">
            <em>￥</em>
            <span>2000.00</span>
          </div>
          <div class="price pull-right">
            <router-link
              :to="{ path: '/recharge', query: { type: 'amount' } }"
              class="goto"
              >去充值</router-link
            >
          </div>
        </div>
      </div>
    </section>
    <section class="section-mode">
      <header>
        <h4 class="title">我的里程</h4>
      </header>
      <div class="content">
        <div class="color-white fs-24 fa-b">30000公里</div>
      </div>
    </section>
    <section class="section-mode">
      <header>
        <h4 class="title">违章信息</h4>
      </header>
      <div class="content">
        <ul class="links">
          <router-link to="" class="arrow">
            <span class="pull-left">待处理违章</span>
            <span class="pull-right fs-12 mr-15">10单</span>
          </router-link>
          <router-link to="" class="arrow">
            <span class="pull-left">违章预存金</span>
            <span class="pull-right fs-12 mr-15">￥200</span>
          </router-link>
        </ul>
      </div>
    </section>
    <section class="section-mode">
      <header>
        <h4 class="title">发票</h4>
      </header>
      <div class="content">
        <ul class="links">
          <router-link to="" class="arrow">
            <span class="pull-left">可开发票总额</span>
            <span class="pull-right fs-12 mr-15">￥200</span>
          </router-link>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "My",
  components: {},
  data() {
    return {
      img: require("@/assets/images/level-img.png"),
    };
  },
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
