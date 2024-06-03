import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import adminsModule from './modules/admins/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js'

const store = createStore({
    modules: {
        coaches: coachesModule,
        admins: adminsModule,
        requests: requestsModule,
        auth: authModule
    }
});

export default store;
