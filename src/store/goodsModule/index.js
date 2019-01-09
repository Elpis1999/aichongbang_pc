import axios from "axios"

export default {
    namespaced: true,
    state: {
        goods: [],
        pagination: {},
        goodsInfo: {},
        updateValidate: false,
        type: "",
        value: ""
    },
    mutations: {
        setGoods(state, arr) {
            state.goods = arr;
        },
        setPagination(state, obj) {
            state.pagination = obj;
        },
        setGoodsInfo(state, obj) {
            state.goodsInfo = obj;
        },
        setType(state, type) {
            state.type = type;
        },
        setValue(state, value) {
            state.value = value;
        },
        setUpdateValidate(state, boolean) {
            state.updateValidate = boolean;
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
            obj.type = this.state.goodsModule.type;
            obj.value = this.state.goodsModule.value;
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