import Vue from 'vue'
import Vuex from 'vuex'
import goodsModule from "./goodsModule/index"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        goodsModule
    }
})

export default store;