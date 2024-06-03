export default {
    addAdmin(state, payload) {
        state.isAdmin = payload.isAdmin;
    },
    isAdmin(state, payload) {
        state.isAdmin = payload;
    }
}