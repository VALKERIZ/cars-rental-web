<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.addEventListener("click", (e) => {
      // 车辆列表
      const carsSwiper = document.getElementsByClassName("cars-wrap")[0];
      if (carsSwiper && !carsSwiper.contains(e.target)) {
        // 鼠标抬起时会请求接口，并加载数据，显示列表
        // 抬起时，如果不在列表范围内，需要隐藏列表
        const isRequestCarsList = this.$store.state.app.isRequestCarsList;
        if (!isRequestCarsList) {
          // false 不是在请求汽车列表状态
          this.$store.commit("app/SET_CARS_LIST_STATUS", false);
        }
        /**
         *  1、点击地图时，需要判断是否是点击的停车场。用 isRequestCarsList 做标记，true：是停车场，false：不是停车场
         *  2、判断 isRequestCarsList 为 false 时，修改 isClickCarsList 为 false，点击的不是车辆列表。
         */
      }
    });
  },
};
</script>
<style lang="scss"></style>
