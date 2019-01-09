import Vue from 'vue'
import Vuex from 'vuex'
import goodsModule from "./goodsModule/index"
import supgoodsModule from "./supgoodsModule/index"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        goodsModule,
        supgoodsModule
    }
})

export default store;