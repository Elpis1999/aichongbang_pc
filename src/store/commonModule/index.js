export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        setUser(state, obj) {
            state.user = obj;
        }
    }
}