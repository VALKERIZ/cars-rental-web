const state = {
    selfLocation: true,
};
const mutations = {
    SELF_LOCATION(state) {
        console.log(state);
        state.selfLocation = !state.selfLocation;
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