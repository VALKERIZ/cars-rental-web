<template>
  <div class="amap-wrap">
    <el-amap vid="amapContainer" class="amap-demo" :events="events"> </el-amap>
  </div>
</template>

<script>
// import { AMapManager } from "vue-amap"; //高德地图原生SDK
import { lazyAMapApiLoaderInstance } from "vue-amap";
export default {
  name: "Amap",
  data() {
    return {
      map: null,
      zoom: 18,
      events: {},
    };
  },
  mounted() {
    //高德地图原生SDK
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map("amapContainer", {
        center: [121.59996, 31.197646],
        zoom: this.zoom,
      });
    });
  },
};
</script>

<style lang="scss">
.amap-wrap {
  height: 100vh;
}
</style>
