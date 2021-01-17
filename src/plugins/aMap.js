import Vue from "vue";
//高德离线地图
import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: "3e87c8e1ff58cc887787b35b694ecb32",
    plugin: ["AMap.Geolocation", "AMap.Walking"],
    // 默认高德 sdk 版本为 1.4.4
    v: "1.4.4",
    // uiVersion: "1.0.11",
});