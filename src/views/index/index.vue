<template>
  <div>
    <!-- 会员页面 -->
    <div id="user-view" :class="{ open: showUser }">
      <router-view />
    </div>
    <!-- 底部操作栏 -->
    <Navbar />
    <!-- 汽车列表 -->
    <Cars ref="cars" />
    <!-- 地图组件 -->
    <Amap
      @callbackComponent="callbackComponent"
      :parking="parking"
      ref="amap"
    />
    <!-- 获取后端数据的登录 -->
    <Login></Login>
    <!-- 车辆使用情况 -->
    <div
      class="cars_activation"
      v-if="cars_active_data && cars_active_data.order_no"
    >
      <router-link
        :to="{
          path: '/orderDetailed',
          query: { order_no: cars_active_data.order_no },
        }"
        class="color-white"
        >正在使用的车辆</router-link
      >
    </div>
    <div
      class="button-group"
      v-if="cars_active_data && cars_active_data.order_no"
    >
      <el-button
        type="primary"
        size="small"
        @click="carsGet"
        v-if="cars_active_data.order_status == 'WAIT'"
        >取车</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="carsReturn"
        v-if="cars_active_data.order_status == 'RETURN'"
        >还车</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="carsCancel"
        v-if="cars_active_data.order_status == 'WAIT'"
        >取消</el-button
      >
    </div>
  </div>
</template>

<script>
import Amap from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
import Login from "./login";
// API
import { Parking } from "@/api/parking";
import {
  GetCarsActivation,
  CarsGet,
  CarsReturn,
  CarsReturnS,
  CarsCancel,
} from "@/api/order";
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
      cars_active_data: JSON.parse(localStorage.getItem("cars_active")),
    };
  },
  beforeMount() {
    !this.cars_active_data && this.getCarsActivation();
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
              this.$store.commit("app/SET_CARS_LIST_REQUEST", true);
              this.walking(e);
              this.getCarsList(e);
            },
          };
        });
        this.parking = data;
        // 获取停车场的id
        const parking_id = data.map((i) => i.id);
        this.$store.commit("parking/SET_PARKING_ID", parking_id);
      });
    },
    // 路线规划
    walking(e) {
      const data = e.target.getExtData();
      this.$refs.amap.saveData({
        key: "parkingData",
        value: data,
      });
      this.$refs.amap && this.$refs.amap.handlerWalking(data.lnglat.split(","));
    },
    // 停车场车辆列表
    getCarsList(e) {
      const data = e.target.getExtData();
      this.$refs.cars && this.$refs.cars.getCarsList(data.id);
    },
    /** 获取正在使用的车辆 */
    getCarsActivation() {
      GetCarsActivation().then((response) => {
        const data = response.data;
        if (data) {
          this.cars_active_data = data;
          localStorage.setItem("cars_active", JSON.stringify(data));
        }
      });
    },
    /** 取车 */
    carsGet() {
      CarsGet({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
      }).then((response) => {
        const data = response.data;
        if (data && data.order_status) {
          this.$set(this.cars_active_data, "order_status", data.order_status);
          localStorage.setItem(
            "cars_active",
            JSON.stringify(this.cars_active_data)
          );
        }
      });
    },
    /** 还车 */
    carsReturn() {
      CarsReturn({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
      }).then((response) => {
        this.$message({
          message: response.message,
          type: "success",
        });
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
      });
    },
    /** 还车(需要停车场id) */
    carsReturns() {
      CarsReturns({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
        parking_id: "",
      }).then((response) => {
        this.$message({
          message: response.message,
          type: "success",
        });
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
      });
    },

    /** 取消 */
    carsCancel() {
      CarsCancel({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
      }).then((response) => {
        this.$message({
          message: response.message,
          type: "success",
        });
        this.cars_active_data = null;
        localStorage.removeItem("cars_active");
      });
    },
  },
  watch: {
    "$store.state.app.isClickCarsList": {
      handler(newValue) {
        if (!newValue) {
          // 清空车辆列表
          this.$refs.cars.carsList = [];
          // 清除覆盖物详情
          this.$refs.amap.parkingInfo = [];
        } // 为 false 时，点击的不是车辆列表
        this.$store.commit("app/SET_CARS_LIST_STATUS", true);
      },
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
.cars_activation {
  position: fixed;
  left: 20px;
  top: 20px;
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 12px;
  background-color: green;
  color: #fff;
}
.button-group {
  position: fixed;
  left: 20px;
  top: 60px;
}
</style>
