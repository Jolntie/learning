export default {
    requests(state, _getters, _rootState, rootGetters) {
        const fullname = rootGetters.fullname;
        if (fullname) {
            const reconstructedFullname = fullname.replace(' ', '-');
            return state.requests.filter(req => req.coachId === reconstructedFullname);
        }
    },
    hasRequests(_state, getters) {
        return getters.requests && getters.requests.length > 0;
    }
};