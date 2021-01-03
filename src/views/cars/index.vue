<template>
  <div class="cars-wrap">
    <div class="cars-wrap-swiper">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide><CarsList :height="'825px'"/></swiper-slide>
        <swiper-slide><CarsList /></swiper-slide>
        <swiper-slide><CarsList /></swiper-slide>
        <swiper-slide><CarsList /></swiper-slide>
        <swiper-slide><CarsList /></swiper-slide>
      </swiper>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import CarsList from "@c/carsList";
export default {
  name: "Cars",
  components: {
    Swiper,
    SwiperSlide,
    CarsList,
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
    };
  },
  methods: {},
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
