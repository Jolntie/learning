export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_state, getters, _rootState, rootGetters) {
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        return coaches.some(coach => coach.id === userId)
    },
    isAdmin(_state, _getters, _rootState, rootGetters) {
        const userEmail = rootGetters.userEmail;
        return userEmail === 'admin@email.com';
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch)
            return true;

        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};
