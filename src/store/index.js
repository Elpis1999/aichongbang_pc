import Vue from 'vue'
import Vuex from 'vuex'
import goodsModule from "./goodsModule/index"
<<<<<<< HEAD
import supgoodsModule from "./supgoodsModule/index"
import suppilrModule from "./supplierModule/index"
=======
import suppilerModule from "./suppilerModule/index"

>>>>>>> 751407f90bc8b165b390305c28d0bcf60c53cad4
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        goodsModule,
<<<<<<< HEAD
        supgoodsModule,
        suppilrModule
=======
        suppilerModule
>>>>>>> 751407f90bc8b165b390305c28d0bcf60c53cad4
    }
})

export default store;