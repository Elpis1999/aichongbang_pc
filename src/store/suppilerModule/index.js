import axios from "axios"

export default {
    namespaced: true,
    state: {
        suppiler: [],
        type: "",
        value: "",
        pagination: {},
        dialogTableVisible: false,
        goods: [],
        supId: "",
        goodsType: "",
        goodsValue: "",
        goodsPagination: {
            rows: []
        },
        page: 1,
        rows: 5,
        goodsPage: 1,
        goodsRows: 5
    },
    mutations: {
        setSuppiler(state, arr) {
            state.suppiler = arr;
        },
        setType(state, type) {
            state.type = type;
        },
        setValue(state, value) {
            state.value = value;
        },
        setGoodsType(state, type) {
            state.goodsType = type;
        },
        setGoodsValue(state, value) {
            state.goodsValue = value;
        },
        setPage(state, page) {
            state.page = page;
        },
        setRows(state, rows) {
            state.rows = rows;
        },
        setGoodsPage(state, page) {
            state.goodsPage = page;
        },
        setGoodsRows(state, rows) {
            state.rows = rows;
        },
        setPagination(state, value) {
            state.pagination = value;
        },
        setGoodsPagination(state, value) {
            state.goodsPagination = value;
        },
        setDialogTableVisible(state, boolean) {
            state.dialogTableVisible = boolean;
        },
        setGoods(state, arr) {
            state.goods = arr;
        },
        setSupId(state, value) {
            state.supId = value;
        }
    },
    actions: {
        show({
            commit
        }) {
            let {
                page,
                rows,
                type,
                value
            } = this.state.suppilerModule;
            axios({
                method: "get",
                url: "/suppiler",
                params: {
                    page,
                    rows,
                    type,
                    value
                }
            }).then(({
                data
            }) => {
                commit("setSuppiler", data.rows);
                commit("setPagination", data);
            });
        },
        stockPurchase({
            commit
        }) {
            let {
                goodsType,
                goodsValue,
                goodsPage,
                goodsRows,
                supId
            } = this.state.suppilerModule;
            axios({
                method: "get",
                url: "/supGods",
                params: {
                    page: goodsPage,
                    rows: goodsRows,
                    type: goodsType,
                    value: goodsValue,
                    supId
                }
            }).then(({
                data
            }) => {
                commit("setGoods", data.rows);
                commit("setGoodsPagination", data);
            });
        }

    }
}