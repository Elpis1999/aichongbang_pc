export default {
    namespaced: true,
    state: {
        user: {},
        store: {}
    },
    mutations: {
        setUser(state, obj) {
            state.user = obj;
        },
        setStore(state, obj) {
            state.store = obj;
        }
    }
}