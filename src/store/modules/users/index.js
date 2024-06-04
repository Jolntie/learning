import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
    state() {
        return {
            fullname: null,
            userEmail: null
        };
    },
    mutations,
    actions,
    getters
}