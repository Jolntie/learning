import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
    state() {
        return {
            isAdmin: false,
            isCoach: false,
            fullname: null,
            userEmail: null
        };
    },
    mutations,
    actions,
    getters
}