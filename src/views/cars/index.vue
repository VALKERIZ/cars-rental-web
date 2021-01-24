<template>
  <div class="cars-wrap" v-show="carsList && carsList.length > 0">
    <div class="cars-wrap-swiper">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in carsList" :key="item.id"
          ><CarItem :data="item"
        /></swiper-slide>
      </swiper>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import CarItem from "./carItem";
// API
import { GetCarsList } from "@/api/cars";
export default {
  name: "Cars",
  components: {
    Swiper,
    SwiperSlide,
    CarItem,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      carsList: [],
    };
  },
  methods: {
    getCarsList(parkingId) {
      GetCarsList({ parkingId }).then((rs) => {
        const data = rs.data.data;
        data && (this.carsList = data);
        // 还原状态
        this.$store.commit("app/SET_CARS_LIST_REQUEST", false);
      });
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
