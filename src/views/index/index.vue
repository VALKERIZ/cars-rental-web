<template>
  <div class="amap-wrap">
    <el-amap vid="amapDemo" :zoom="zoom" class="amap-demo"> </el-amap>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      zoom: 12,
    };
  },
};
</script>

<style lang="scss">
.amap-wrap {
  height: 100vh;
}
</style>
