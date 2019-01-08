import axios from "axios"

export default {
    namespaced: true,
    state: {
        goods: [],
        pagination: {},
        goodsInfo: {},
        updateValidate: false
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
        setupdateValidate(state, boolean) {
            state.updateValidate = boolean;
        }
    },
    actions: {
        show({
            commit
        }, page = 1, rows = 5, type = "", value = "") {
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