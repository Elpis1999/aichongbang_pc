import axios from "axios";
export default {
  namespaced: true,
  state: {
    id: "",
    SupGood: {},
    supGoods: [],
    UpdateVisible: false,
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    // 储存要修改的数据
    setSupGood(state, data) {
      state.SupGood = data;
    },
    // 储存所有的商品
    setSupGoods(state, data) {
      state.supGoods = data;
    },
    // 修改的模态框
    setUpdateVisible(state, UpdateVisible) {
      state.UpdateVisible = UpdateVisible
    },
  },
  actions: {
    // 修改用
    setSupGood({ commit }, id) {
      axios({
        method: "get",
        url: "/suppilergoods/" + id
      }).then(({ data }) => {
        commit("setSupGood", data);
      });
    },
    // 获取所有的show方法
    setSupGoods({ state, commit }, payload = { page: 1, rows: 5 }) {
      axios({
        method: "get",
        url: "/supGods",
        params: {
          ...payload,
          supId: state.id
        }
      }).then(({ data }) => {
        // console.log(data);
        // this.supgoods = data.rows;
        commit("setSupGoods", data.rows);
      });
    },
    setID({ commit }, id) {
      commit("setId", id);
      // console.log(state.id)
    }
  }
};
