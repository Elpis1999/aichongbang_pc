import axios from "axios";
export default {
  namespaced: true,
  state: {
    id: "",
    SupGood: {},
    supGoods: [],
    UpdateVisible: false,
    bigimgs: [],
    smallimgs: [],
    bigpic: [],
    smallpic: [],
    pagination: {},
    type: "",
    value: ""
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    // 储存加页码的数据
    setPagination(state, pagination) {
      state.pagination = pagination
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
      state.UpdateVisible = UpdateVisible;
      console.log(UpdateVisible)
    },
    setType(state, type) {
      state.type = type
    },
    setValue(state, value) {
      state.value = value
    },
    // 在修改时渲染出所有图片
    setBigimgs(state, data) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let str = { "name": data[i], "url": "http://127.0.0.1:3001/upload/" + data[i] }
        arr.push(str)
      }
      state.bigimgs = arr;
      state.bigpic = data;
      console.log(state.bigimgs)
    },
    setSmallimgs(state, data) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let str = { "name": data[i], "url": "http://127.0.0.1:3001/upload/" + data[i] }
        arr.push(str)
      }
      state.smallimgs = arr;
    },
    // 在修改中进行图片的删除
    setBigpic(state, data) {
      let arr = state.bigpic;
      console.log(arr, data)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == data) {
          arr.splice(i, 1);
          // console.log(this.smallpic);
          break;
        }
      }
      state.bigpic = arr;
    },
    setSmallpic(state, data) {
      let arr = state.smallpic;
      console.log(arr, data)
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == data) {
          arr.splice(i, 1);
          // console.log(this.smallpic);
          break;
        }
      }
      state.smallpic = arr;
    },
  },
  actions: {
    // 修改用
    setSupGood({ commit }, id) {
      axios({
        method: "get",
        url: "/supGods/" + id
      }).then(({ data }) => {
        commit("setSupGood", data);
        commit("setBigimgs", data.bigpic);
        commit("setSmallimgs", data.smallpic);
        // console.log(data, "大图", data.bigpic, "小图", data.smallpic)
      });
    },
    // 获取所有的show数据
    setSupGoods({ state, commit }, payload = { page: 1, rows: 5 }) {
      axios({
        method: "get",
        url: "/supGods",
        params: {
          ...payload,
          supId: state.id,
          type: state.type,
          value: state.value
        }
      }).then(({ data }) => {
        commit("setSupGoods", data.rows);
        commit("setPagination", data);
        console.log(data)
      });
    },
    setID({ commit }, id) {
      commit("setId", id);
      // console.log(state.id)
    }
  }
};
