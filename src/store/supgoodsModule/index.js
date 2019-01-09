import axios from "axios";
export default {
  namespaced: true,
  state: {
   id:""
  },
  mutations: {
    setId(state, id) {
        state.id = id;
      },
  },
  actions: {


  }
};
