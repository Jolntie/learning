export default {
    userEmail(state) {
        return state.userEmail;
    },
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    isAdmin(_state, _getters, _rootState, rootGetters) {
        const userEmail = rootGetters.userEmail;
        return userEmail === 'admin@email.com';
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
}