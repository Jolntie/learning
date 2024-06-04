export default {
    addUserData(state, payload) {
        state.fullname = payload.fullname;
        state.isAdmin = payload.isAdmin;
        state.isCoach = payload.isCoach;
        state.userEmail = payload.email;
    },
    addAdmin(state, payload) {
        state.isAdmin = payload.isAdmin;
    },
    isAdmin(state, payload) {
        state.isAdmin = payload;
    }
}