import axios from "axios"

export default {
    namespaced: true,
    state: {
        supplier: [],
        type: "",
        value: ""
    },
    mutations: {
        setSupplier(state, arr) {
            state.goods = arr;
        },
        setType(state, type) {
            state.type = type;
        },
        setValue(state, value) {
            state.value = value;
        }
    },
    actions: {
        show({
            commit
        }, obj = {
            page: 1,
            rows: 5
        }) {
            obj.page = obj.page || 1;
            obj.rows = obj.rows || 5;
            obj.type = this.state.supplierModule.type;
            obj.value = this.state.supplierModule.value;
            let {
                page,
                rows,
                type,
                value
            } = obj
            axios({
                method: "get",
                url: "/goods",
                params: {
                    page,
                    rows,
                    type,
                    value
                }
            }).then(({
                data
            }) => {
                commit("setGoods", data.rows);
                commit("setPagination", data);
            });
        },
    }
}