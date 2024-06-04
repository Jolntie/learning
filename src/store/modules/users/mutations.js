export default {
    addUserData(state, payload) {
        state.fullname = payload.fullname;
        state.userEmail = payload.email;
    },
    getUser(state) {
        return {
            fullname: state.fullname,
            email: state.userEmail
        }
    }
}