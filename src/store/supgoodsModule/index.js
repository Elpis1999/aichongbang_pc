import axios from "axios";
export default {
  namespaced: true,
  state: {
    id: "",
    disabled: false
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setDisable(state, disable) {
      state.disabled = disable;
    }
  },
  actions: {}
};
