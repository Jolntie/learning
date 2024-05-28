import mutations from './mutations.js';
import actions from './action.js';
import getters from './getters.js';

export default {
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        };
    },
    mutations,
    actions,
    getters
}