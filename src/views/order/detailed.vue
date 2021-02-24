<template>
  <div class="user-container">
    <Back />
    <div class="order-list">
      <div class="item">
        <div class="info">
          <time class="flex-1">2020-11-11 12:00:00</time>
          <div class="flex-1">
            <span class="status color-wait">初始化</span>
          </div>
        </div>
        <p class="number">粤 B8X4B6</p>
        <div class="clearfix">
          <div class="price pr arrow pull-left">
            <em>￥</em>
            <span>1111.11</span>
          </div>
          <div class="pull-right fs-18 lh-40">支付宝支付</div>
        </div>
      </div>
    </div>
    <section class="section-mode">
      <header>
        <h4 class="title">用车计费</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li>
            <span class="pull-left">起步价</span>
            <span class="pull-right s-12">￥12.90</span>
          </li>
          <li>
            <span class="pull-left">时长费</span>
            <span class="pull-right s-12">￥12.90</span>
          </li>
          <li>
            <span class="pull-left">里程费</span>
            <span class="pull-right s-12">￥12.90</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-mode">
      <header>
        <h4 class="title">其他费用</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li>
            <span class="pull-left">全面保障服务费</span>
            <span class="pull-right s-12">￥0.00</span>
          </li>
          <li>
            <span class="pull-left">还车服务费</span>
            <span class="pull-right s-12">￥0.00</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="section-mode">
      <header>
        <h4 class="title">优惠减免</h4>
      </header>
      <div class="content">
        <ul class="links">
          <li>
            <span class="pull-left">会员优惠</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
          <li>
            <span class="pull-left">活动优惠</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
          <li>
            <span class="pull-left">特权卡</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
          <li>
            <span class="pull-left">用车券</span>
            <span class="pull-right s-12">-￥0.00</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "OrderDetailed",
  components: {},
  data() {
    return {};
  },
};
</script>
<style lang="scss">
@import "./index.scss";
.section-mode {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 30px;
  header {
    margin-bottom: 10px;
  }
  .title {
    font-size: 14px;
    color: #fff;
    opacity: 0.5;
  }
}
.links {
  li {
    display: block;
    height: 20px;
    line-height: 20px;
    position: relative;
    padding: 11px 0;
    color: #fff;
    font-size: 16px;
  }
}
</style>
