import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            coaches: []
        };
    },
    mutations,
    actions,
    getters
};
