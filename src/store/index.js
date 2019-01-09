import Vue from 'vue'
import Vuex from 'vuex'
import goodsModule from "./goodsModule/index"
import supgoodsModule from "./supgoodsModule/index"
import suppilrModule from "./suppilerModule/index"
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        goodsModule,
        supgoodsModule,
        suppilrModule
    }
})

export default store;