<template>
  <div class="amap-wrap">
    <el-amap
      vid="amapContainer"
      :events="events"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
    >
      <!--覆盖物 - 圆-->
      <el-amap-circle
        v-for="item in circle"
        :key="item.id"
        :center="item.center"
        :radius="item.radius"
        :fillColor="item.color"
        :strokeColor="item.color"
        :strokeOpacity="item.strokeOpacity"
        :strokeWeight="item.strokeWeight"
      ></el-amap-circle>
      <!--覆盖物 - 停车场-->
      <el-amap-marker
        v-for="(item, index) in parking"
        :key="item.id"
        :content="item.content"
        :offset="item.offset"
        :position="item.position"
        :vid="index"
      ></el-amap-marker>

      <!--覆盖物 - 停车场 - 车辆-->
      <el-amap-marker
        v-for="(item, index) in parking"
        :extData="item"
        :events="item.events"
        :key="item.id + index"
        :content="item.text"
        :offset="item.offsetText"
        :position="item.position"
        :vid="index"
      ></el-amap-marker>
      <!--覆盖物 - 停车场 - 距离信息-->
      <el-amap-marker
        v-for="(item, index) in parkingInfo"
        zIndex="1000"
        :key="item.id"
        :content="item.text"
        :offset="item.offset"
        :position="item.position"
        :vid="index"
      ></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import { SelfLocation } from "./location";
import { Walking } from "./walking";

let amapManager = new AMapManager();
export default {
  name: "Amap",
  props: {
    parking: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const _this = this;
    return {
      map: null,
      zoom: 15,
      center: [0, 0],
      amapManager,
      self_lng: "",
      self_lat: "",
      events: {
        init(o) {
          //兼容高德地图SDK,o为高德实例
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          });
        },
      },
      // 自定义圆
      circle: [],
      // 停车场位置
      parkingData: {},
      // 停车场信息
      parkingInfo: [],
    };
  },
  methods: {
    initMap() {
      //存储地图实例
      this.map = amapManager.getMap();
      // 初始化完成，回调
      this.$emit("callbackComponent", {
        function: "loadMap",
      });
      this.setSelfLocation();
    },
    /** 存储数据 */
    saveData(params) {
      if (this[params.key]) {
        this[params.key] = params.value;
      }
    },
    // 获取自身定位
    setSelfLocation() {
      SelfLocation({
        map: this.map,
        complete: (value) => this.selfLocationComplete(value),
      });
    },
    // 获取自身定位成功的回调
    selfLocationComplete(result) {
      this.self_lng = result.position.lng;
      this.self_lat = result.position.lat;
      const obj = {
        radius: 4,
        color: "#393e43",
        strokeOpacity: "0.2",
        strokeWeight: "30",
      };
      obj.center = [this.self_lng, this.self_lat];
      this.circle.push(obj);
    },
    // 步行导航
    handlerWalking(lnglat) {
      Walking({
        map: this.map,
        position_start: [this.self_lng, this.self_lat],
        position_end: lnglat,
        complete: (value) => this.walkingComplete(value),
      });
    },
    walkingComplete(result) {
      console.log(result);
      this.parkingInfo = [
        {
          position: this.parkingData.lnglat.split(","),
          text: `<div class='parkingInfoWrap'>
                        <span class="parkingInfoNumber">${this.parkingData.carsNumber}</span>
                        辆车<span class="parkingInfoLine"></span>距离您${result.routes[0].distance}米
                    </div>`,
          offset: [-15, -54],
        },
      ];
    },
  },
  watch: {
    // 点击定位按钮回到定位点
    "$store.state.location.selfLocation": {
      handler() {
        this.setSelfLocation();
      },
    },
  },
};
</script>

<style lang="scss">
.amap-wrap {
  height: 100vh;
}
.parkingInfoWrap {
  color: white;
  border-radius: 100px;
  padding: 0 10px 0 5px;
  font-size: 12px;
  background-color: #34393f;
  width: 160px;
}
.parkingInfoNumber {
  font-size: 20px;
  margin-right: 5px;
  line-height: 50px;
  height: 60px;
  vertical-align: sub;
}
.parkingInfoLine {
  display: inline-block;
  height: 15px;
  width: 1px;
  background-color: white;
  opacity: 0.3;
  margin: 0 10px -3px;
}
</style>
