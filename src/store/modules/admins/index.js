import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
    state() {
        return {
            userEmail: null,
            isAdmin: null
        };
    },
    mutations,
    actions,
    getters
}