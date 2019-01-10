export default {
    namespaced: true,
    state: {
        user: {},
        store: {},
        suppiler: {}
    },
    mutations: {
        setUser(state, obj) {
            state.user = obj;
        },
        setStore(state, obj) {
            state.store = obj;
        },
        setSuppiler(state, obj) {
            state.store = obj;
        }
    }
}