export default {
    isAdmin(state) {
        return state.isAdmin
    },
    resetAdminValue(state) {
        state.isAdmin = false;
    }
}