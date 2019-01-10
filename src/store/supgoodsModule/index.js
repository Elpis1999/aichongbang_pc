import axios from "axios";
export default {
  namespaced: true,
  state: {
    id: "",
    disabled: true
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setDisable(state, disabled) {
      state.disabled = disabled;
    }
  },
  actions: {}
};
