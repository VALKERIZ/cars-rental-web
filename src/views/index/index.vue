<template>
  <div>
    <!-- 会员页面 -->
    <div id="user-view" :class="{ open: showUser }">
      <router-view />
    </div>
    <!-- 底部操作栏 -->
    <Navbar />
    <!-- 汽车列表 -->
    <!-- <Cars /> -->
    <!-- 地图组件 -->
    <Amap
      @callbackComponent="callbackComponent"
      :parking="parking"
      ref="amap"
    />
    <!-- 登录 -->
    <Login></Login>
  </div>
</template>

<script>
import Amap from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
import Login from "./login";
// API
import { Parking } from "@/api/parking";
export default {
  name: "Index",
  components: {
    Amap,
    Cars,
    Navbar,
    Login,
  },
  data() {
    return {
      parking: [],
    };
  },
  computed: {
    showUser() {
      return this.$route.name !== "Index" ? true : false;
    },
  },
  methods: {
    callbackComponent(params) {
      params.function && this[params.function](params.data);
    },
    // 地图加载完成回调
    loadMap() {
      this.getParking();
    },
    // 获取停车场数据
    getParking() {
      Parking().then((response) => {
        const data = response.data.data;
        data.forEach((item) => {
          item.position = item.lnglat.split(",");
          item.content =
            "<img src='" +
            require("@/assets/images/parking_location_img.png") +
            "' />";
          item.offset = [-35, -60];
          item.offsetText = [-30, -55];
          item.text = `<div style="width: 60px; font-size: 20px; color: #fff; text-align: center;line-height: 50px; height: 60px;">${item.carsNumber}</div>`;
          item.events = {
            click: (e) => {
              this.walking(e);
            },
          };
        });
        this.parking = data;
      });
    },
    walking(e) {
      const data = e.target.getExtData();
      console.log(data);
      this.$refs.amap.saveData({
        key: "parkingData",
        value: data,
      });
      this.$refs.amap.handlerWalking(data.lnglat.split(","));
    },
  },
};
</script>

<style lang="scss">
#user-view {
  position: fixed;
  top: 0;
  bottom: 0;
  right: -600px;
  z-index: 100;
  width: 410px;
  background-color: $color-main;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, 0.4));
  &.open {
    right: 0px;
  }
}
</style>
