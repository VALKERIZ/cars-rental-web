<template>
  <div>
    <!-- 会员页面 -->
    <div id="user-view" :class="{ open: showUser }">
      <router-view />
    </div>
    <!-- 底部操作栏 -->
    <Navbar>
      <template v-slot:center_button>
        <a
          class="select-car-btn"
          href="javascript: void(0);"
          @click="centerClick"
          >{{ showStatus }}</a
        >
      </template>
    </Navbar>
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
  </div>
</template>

<script>
import Amap from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
import Login from "./login";
// API
import { Parking } from "@/api/parking";
import { GetCarsActivation, CarsGet, CarsReturns } from "@/api/order";
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
      parking_id: null,
    };
  },
  beforeMount() {
    this.getCarsActivation();
  },
  computed: {
    showUser() {
      return this.$route.name !== "Index" ? true : false;
    },
    status() {
      return this.$store.state.order.operationStatus;
    },
    showStatus() {
      let obj = this.$store.state.config.order_status;
      return obj[this.status].zh;
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
      console.log(data);
      this.parking_id = data.id;
      this.$refs.cars && this.$refs.cars.getCarsList(data.id);
    },
    // 提交当前操作状态
    commitStatus(value) {
      this.$store.commit(
        "order/SET_OPERATION_STATUS",
        value || this.cars_active_data.order_status
      );
    },
    /** 获取正在使用的车辆 */
    getCarsActivation() {
      GetCarsActivation().then((response) => {
        const data = response.data;
        if (data) {
          this.cars_active_data = data;
          localStorage.setItem("cars_active", JSON.stringify(data));
          this.commitStatus();
        }
      });
    },
    centerClick() {
      console.log(this.status);
      switch (this.status) {
        case "WAIT":
          this.carsGet();
          break;
        case "RETURN":
          this.carsReturns();
          break;
      }
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
          this.commitStatus();
        }
      });
      this.parking_id = null;
    },

    /** 还车(需要停车场id) */
    carsReturns() {
      if (!this.parking_id) {
        this.$confirm("请选择要归还的停车场", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        CarsReturns({
          order_no: this.cars_active_data.order_no,
          cars_id: this.cars_active_data.cars_id,
          parking_id: this.parking_id,
        }).then((response) => {
          this.$message({
            message: response.message,
            type: "success",
          });
          this.cars_active_data = null;
          localStorage.removeItem("cars_active");
          this.commitStatus(response.data.order_status);
        });
      }
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
    "$store.state.order.ordered": {
      handler(newValue) {
        if (newValue) {
          this.getCarsActivation();
        }
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
