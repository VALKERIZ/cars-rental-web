<template>
  <div>
    <!-- 车辆信息略缩图 -->
    <section class="cars-item" @click="getCasrInfo">
      <header>
        <h4 class="cars-logo">
          <img :src="data.imgUrl" :alt="data.carsMode" />
          <span class="name">{{ data.carsMode }}</span>
        </h4>
        <p class="cars-attr">
          <span class="type">{{ data | energyType }}</span>
          <span>{{ data.carsAttr | seatNumber }}座</span>
        </p>
      </header>
      <div class="cars-content">
        <div class="info">
          <div>
            <h4 class="cars-number">{{ data.carsNumber }}</h4>
            <div>
              <ul class="cars-electric" :class="totalKM">
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
                <strong>{{ data.countKm | kmCheck }}</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img src="../../../assets/images/pic001.jpg" alt="" />
      </div>
      <footer>
        <a href="javascript: void(0);" class="parking-link">{{
          data.parkingName
        }}</a>
      </footer>
    </section>
    <!-- 车辆详细信息 -->
    <section
      class="cars-item cars-detailed"
      :style="'height:' + cars_info_height"
      v-if="cars_info_show"
    >
      <div class="scroll">
        <h4 class="column">
          {{ data.parkingName }}
          <i class="close" @click="closeCarsInfo"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img :src="data.imgUrl" :alt="data.carsMode" />
            <span class="name">{{ data.carsMode }}</span>
          </h4>
          <p class="cars-attr">
            <span class="type">{{ data | energyType }}</span>
            <span>{{ data.carsAttr | seatNumber }}座</span>
          </p>
        </header>
        <img src="../../../assets/images/pic001.jpg" alt="" width="100%" />
        <div class="clearfix">
          <div class="pull-left fs-24">{{ data.carsNumber }}</div>
          <p class="distance pull-right">
            <sub>约</sub>
            <strong>{{ data.countKm | kmCheck }}</strong>
            <sub>KM</sub>
          </p>
        </div>
        <div class="cars-electric-box">
          <div class="p-r">
            <span class="e-high" :style="`width: ${power}%`"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <p class="info color-main text-center">
          取车约支付12.0元停车费，实际补贴12.0元
        </p>
        <ul class="cars-type-list">
          <li
            v-for="item in leaseListData"
            :class="{ current: leaseId == item.carsLeaseTypeId }"
            :key="item.carsLeaseTypeId"
            @click="selectLeaseType(item)"
          >
            <h4 class="name">{{ item.carsLeaseTypeName }}</h4>
            <span class="price">￥{{ item.price }}</span>
          </li>
        </ul>
        <div class="clause-dec">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i :class="{ current: isPlause }" @click="clauseClick"></i>
        </div>
      </div>
      <a class="select-car-btn" @click="confirmCars" :disabled="true"
        >预约用车</a
      >
    </section>
  </div>
</template>
<script>
import { getCarsAttrKey } from "@/utils/format";
// API
import { GetLeaseList, ConfirmCars } from "@/api/cars";
export default {
  name: "CarsList",
  filters: {
    kmCheck(val) {
      return isNaN(Number(val)) ? "?" : val;
    },
    energyType(val) {
      const energyList = {
        "1": "电",
        "2": "油",
        "3": "混合动力",
      };
      return energyList[val.energyType];
    },
    seatNumber(val) {
      return getCarsAttrKey({
        data: val,
        parentKey: "carsBody",
        childKey: "seat_number",
      });
    },
  },
  computed: {
    totalKM() {
      let val;
      let { energyType: type, oil, electric } = this.data;
      switch (type) {
        case "1":
          val = Math.round(electric / 10);
          break;
        case "2":
          val = Math.round(oil / 10);
          break;
        case "3":
          val = Math.round(electric / 10) + Math.round(oil / 10);
          break;
      }
      let power = (val + Math.random()) * 10;
      this.power = power > 100 ? 100 : power;
      console.log(this.power);
      return `active-li-${val}`;
    },
  },
  data() {
    return {
      cars_info_show: false,
      // 车辆信息弹窗高度
      cars_info_height: 0,
      // 定时器
      timer: null,
      // 租赁类型列表
      leaseListData: [],
      // 租赁ID
      leaseId: "",
      // 详细->剩余能量百分比
      power: 0,
      // 参保
      isPlause: false,
      token: this.$store.state.account.token,
      // 检验提示
      message_item: this.$store.state.config.message_item,
      // 临时使用
      backup_key: "",
      // 用户审核
      arr: [
        "check_real_name",
        "check_cars",
        "gilding",
        "illegalAmount",
        "subscribe",
      ],
      // 重复点击
      clicked: false,
    };
  },
  methods: {
    /** 租车 */
    confirmCars() {
      // 防止频繁点击
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      // 判断用户是登录
      if (!this.token) {
        this.$router.push({
          name: "Login",
        });
        return false;
      }
      if (!this.leaseId) {
        this.$message({
          message: "请选择租车类型",
          type: "error",
        });
        return false;
      }
      console.log(this.data.id, this.leaseId);
      const requestData = {
        cars_id: this.data.id,
        cars_lease_type_id: this.leaseId,
      };
      ConfirmCars(requestData).then((response) => {
        const data = response.data;
        // 预约不成功时
        if (data) {
          const key = Object.keys(data); // 获取错误状态的key  []
          if (key && key.length > 0) {
            // 匹配 message
            this.backup_key = key[0]; // 临时存储
            if (this.arr.includes(key[0])) {
              let message = "";
              let msg = this.message_item[key[0]].msg;
              msg && (message = msg);
              // 弹窗提示
              this.$confirm(message, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }).then(() => {
                let router = this.message_item[this.backup_key].router;
                let type = this.message_item[this.backup_key].type;
                if (router && type) {
                  this.$router.push({
                    name: router,
                    query: { type },
                  });
                }
              });
            }
          }
        } else {
          // 预约成功
          this.$message({
            message: response.message,
            type: "success",
          });
          // this.$router.replace({
          //   path: "/order",
          // });
          this.$store.commit("app/SET_CARS_LIST_STATUS", false);
        }
        console.log(333);
        this.clicked = false;
      });
    },
    getCasrInfo() {
      this.openCarsInfo();
    },
    /** 选择租赁类型 */
    selectLeaseType(data) {
      this.leaseId = data.carsLeaseTypeId;
    },
    /** 打开车辆信息 */
    openCarsInfo() {
      // 高度计算
      const viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const height = viewHeight - 115;
      // 打开信息
      this.cars_info_show = true;
      // 定时器
      if (this.timer) {
        clearTimeout(this.timer);
      } // 防止连续点击，开启多个定时器
      this.timer = setTimeout(() => {
        this.cars_info_height = `${height}px`;
        clearTimeout(this.timer);
      }, 10);
      /** 获取租赁类 */
      this.getLaseList();
    },
    /** 获取租赁类 */
    getLaseList() {
      if (this.leaseListData && this.leaseListData.length > 0) {
        return false;
      }
      GetLeaseList({ carsId: this.data.id }).then((response) => {
        const dataItem = response.data;
        if (dataItem) {
          this.leaseListData = dataItem.data;
          // 默认选择第一项
          this.leaseId = dataItem.data[0].carsLeaseTypeId;
        }
      });
    },
    /** 关闭车辆信息 */
    closeCarsInfo() {
      this.cars_info_show = false;
      this.cars_info_height = 0;
    },
    // 参保点击事件
    clauseClick() {
      this.isPlause = !this.isPlause;
    },
  },
  props: {
    // 单向数据流，也是静态属性
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
