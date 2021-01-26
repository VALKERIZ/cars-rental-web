import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import location from "./modules/location";
import app from "./modules/app";
import account from "./modules/account";
export default new Vuex.Store({
    modules: {
        location,
        app,
        account,
    },
});