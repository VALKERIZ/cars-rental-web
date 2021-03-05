import { GetQiniuToken } from "@/api/common";

const state = {
    // 七牛云上传token
    qiniu_token: "",
    // 当前是否正在请求token
    isRequest: false,
};
const getters = {};
const mutations = {
    SET_QINIU_TOKEN(state, value) {
        state.qiniu_token = value;
    },
    SET_REQUEST_STATUS(state, value) {
        state.isRequest = value;
    },
};
const actions = {
    getQiniuToken(content) {
        return new Promise((resolve, reject) => {
            const requestData = {
                ak: "a0SdM7v6vh2cQ_GacNqlz0qs5pdLw4ZxO3bSJ8Gj",
                sk: "Nb8TdqBXusTen2IB6VN9kDpbdYLIqS2emBlD_SyH",
                buckety: "cars-zsb",
            };
            content.commit("SET_REQUEST_STATUS", true);
            GetQiniuToken(requestData)
                .then((response) => {
                    const data = response.data;
                    content.commit("SET_QINIU_TOKEN", data.token);
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                    // 重复尝试
                    commit.dispatch("getQiniuToken");
                })
                .finally(() => {
                    content.commit("SET_REQUEST_STATUS", false);
                });
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