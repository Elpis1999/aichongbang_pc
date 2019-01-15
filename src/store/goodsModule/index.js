import axios from "axios"

export default {
    namespaced: true,
    state: {
        goods: [],
        pagination: {},
        goodsInfo: {},
        updateValidate: false,
        type: "",
        value: "",
        page: 1,
        rows: 5
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
        setPage(state, page) {
            state.page = page;
        },
        setRows(state, rows) {
            state.rows = rows;
        },
        setUpdateValidate(state, boolean) {
            state.updateValidate = boolean;
        }
    },
    actions: {
        show({
            commit
        }, storeId) {
            let {
                page,
                rows,
                type,
                value
            } = this.state.goodsModule;
            axios({
                method: "get",
                url: "/goods",
                params: {
                    page,
                    rows,
                    type,
                    value,
                    storeId
                }
            }).then(({
                data
            }) => {
                console.log("storeId",storeId);
                console.log("dataaa",data);
                commit("setGoods", data.rows);
                commit("setPagination", data);
            });
        },
    }
}