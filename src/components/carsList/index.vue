<template>
  <div class="cars-list">
    <section class="cars-item">
      <header>
        <h4 class="cars-logo">
          <img src="@/assets/cars-logo.png" alt="465464654" />
          <span class="name">465464654</span>
        </h4>
        <p class="cars-attr">地球也会危害健康</p>
      </header>
      <div class="cars-content">
        <div class="info">
          <div class="licence">粤 B75AQ2</div>
          <ul class="electric active-li-3">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <p class="distance">
            <sub>约</sub>
            <strong>600</strong>
            <sub>KM</sub>
          </p>
        </div>
        <img src="@/assets/pic001.jpg" alt="464123qwe" />
      </div>
      <footer>
        <a href="javascript: void(0);" class="cars-link">翔安隧道停车场</a>
      </footer>
    </section>
    <!-- 车辆详细 -->
    <section class="cars-item cars-detail" :style="{ height: height }">
      <div class="scroll">
        <h4 class="column">
          驱蚊器停车场
          <i class="close"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img src="@/assets/cars-logo.png" alt="465464654" />
            <span class="name">465464654</span>
          </h4>
          <p class="cars-attr">地球也会危害健康</p>
        </header>
        <img src="@/assets/pic001.jpg" alt="464123qwe" width="100%" />
        <div class="clearfix">
          <div class="pull-left fz-24">粤 B75AQ2</div>
          <p class="distance pull-right">
            <sub>约</sub>
            <strong>600</strong>
            <sub>KM</sub>
          </p>
        </div>
        <div class="electric-box">
          <div class="p-r">
            <span class="e-high" style="width: 80%"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <p class="info color-main text-center">大数据的陆奇我合计驱蚊器可好</p>
        <ul class="cars-type-list">
          <li>
            <h4 class="type">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
          <li class="current">
            <h4 class="type">日租车</h4>
            <span class="price">￥300/天</span>
          </li>
          <li>
            <h4 class="type">日租车</h4>
            <span class="price">￥300/天</span>
          </li>
          <li>
            <h4 class="type">日租车</h4>
            <span class="price">￥300/天</span>
          </li>
        </ul>
        <div class="cars-clause-dec">
          <span class="pull-left">参保鞍山地区我也hi纤维和纤维后</span>
          <i class="current"></i>
        </div>
      </div>
      <a href="javascript: void(0);" class="button-main">预约用车</a>
    </section>
  </div>
</template>

<script>
export default {
  name: "CarsList",
  props: {
    height: {
      type: String,
      default: "257px",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
