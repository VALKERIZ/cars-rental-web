import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import location from "./modules/location";
import app from "./modules/app";
import account from "./modules/account";
import config from "./modules/config";
import upload from "./modules/upload";
import order from "./modules/order";
export default new Vuex.Store({
    modules: {
        location,
        app,
        account,
        config,
        upload,
        order,
    },
});