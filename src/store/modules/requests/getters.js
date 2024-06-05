export default {
    requests(state, _getters, _rootState, rootGetters) {
        const coachId = rootGetters.fullname.replace(' ', '-');
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(_state, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};