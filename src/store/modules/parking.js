const state = {
    parking_id: [],
};
const mutations = {
    SET_PARKING_ID(state, value) {
        state.parking_id = value;
        console.log(state.parking_id);
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