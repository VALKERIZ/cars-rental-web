const state = {
    // 当前的操作状态
    operationStatus: "OVER",
    // 点击预约
    ordered: false,
};
const mutations = {
    SET_OPERATION_STATUS(state, value) {
        state.operationStatus = value;
    },
    SET_ORDERED(state, value) {
        state.ordered = value;
    },
};
const actions = {};
const getters = {};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};