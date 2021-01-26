import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//高德地图插件
import "./plugins/aMap";

//全局组件注入
import "./components/back";

// 全局路由守卫
import "./router/per";

//ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");