// API
import { Register, Login, Forget } from "@/api/account";
// cookies
import {
    setToken,
    setUsername,
    removeToken,
    removeUsername,
    getToken,
    getUsername,
} from "@/utils/cookiesCars";
const state = {
    token: getToken() || "",
    username: getUsername() || "", // 获取数据的来源
};
const getters = {};
const mutations = {
    SET_TOKEN(state, value) {
        state.token = value;
    },
    SET_USERNAME(state, value) {
        state.username = value;
    },
};
const actions = {
    // 复用性
    registerAction(context, requestData) {
        return new Promise((resolve, reject) => {
            Register(requestData)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    loginAction(context, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData)
                .then((response) => {
                    const data = response.data;
                    context.commit("SET_TOKEN", data.token);
                    context.commit("SET_USERNAME", data.username);
                    setToken(data.token);
                    setUsername(data.username);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    forgetAction(context, requestData) {
        return new Promise((resolve, reject) => {
            Forget(requestData)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    logoutAction(context, requestData) {
        return new Promise((resolve) => {
            context.commit("SET_TOKEN", "");
            context.commit("SET_USERNAME", "");
            removeToken();
            removeUsername();
            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};