<template>
  <div class="user-container">
    <Back />
    <el-tabs @tab-click="tabClick" type="card" stretch v-model="activeName">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="待取车" name="WAIT"></el-tab-pane>
      <el-tab-pane label="待还车" name="RETURN"></el-tab-pane>
      <el-tab-pane label="取消" name="CANCEL"></el-tab-pane>
      <el-tab-pane label="已完成" name="OVER"></el-tab-pane>
    </el-tabs>
    <!-- 滚动部分 -->
    <swiper class="order-swiper" :options="swiperOption">
      <swiper-slide class="wrapper">
        <div class="item" v-for="item in showData" :key="item.order_no">
          <div class="info">
            <time class="flex-1">{{ item.create_date }}</time>
            <div class="flex-1">
              <span class="status" :class="'color-' + item.order_status">
                {{
                  casrStatus[item.order_status]
                    ? casrStatus[item.order_status].zh
                    : ""
                }}
              </span>
            </div>
          </div>
          <p class="number">{{ item.carsNumber }}</p>
          <div>
            <div class="price pr arrow" @click="detailed">
              <em>￥</em>
              <span>2000.00</span>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
// API
import { OrderList } from "@/api/order";
export default {
  name: "Order",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      orderListData: [],
      showData: [],
      activeName: "all",
      pageNumber: 1,
      pageSize: 999,
      // 车辆状态
      casrStatus: this.$store.state.config.cars_status,
      // 滚动配置
      swiperOption: {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        mousewheel: true,
      },
    };
  },
  beforeMount() {
    this.getOrderList();
  },
  methods: {
    /** 获取租车订单列表 */
    getOrderList(order_status) {
      OrderList({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        order_status,
      }).then((response) => {
        const data = response.data;
        this.orderListData = data.data.reverse();
        this.showData = this.orderListData;
      });
    },
    detailed() {
      this.$router.push({
        name: "OrderDetailed",
      });
    },
    tabClick(tab) {
      if (tab.name == "all") {
        this.showData = this.orderListData;
      } else {
        this.showData = this.orderListData.filter((i) => {
          return i.order_status == tab.name;
        });
      }
    },
  },
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
