import Vue from 'vue'
import Vuex from 'vuex'
import goodsModule from "./goodsModule/index"
import supgoodsModule from "./supgoodsModule/index"
import suppilerModule from "./suppilerModule/index"
import commonModule from "./commonModule/index"
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        goodsModule,
        supgoodsModule,
        suppilerModule,
        commonModule
    }
})

export default store;