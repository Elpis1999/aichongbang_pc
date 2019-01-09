import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import StoreApplication from "../store_manage/store_application/index.vue";
import Supgoods from "../suppilergoods/index"
import StoreGoods from "../store_manage/goods_manage/index.vue"
import SupplierGoods from "../store_manage/supplier_goods/index.vue"

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/manage',
        component: Manage,
        children: [{
            path: '/manage/storeapplication',
            component: StoreApplication
        }, {
            path: '/manage/supgoods',
            component: Supgoods
        }
   , {
            path: '/manage/storegoods',
            component: StoreGoods
        }, {
            path: '/manage/suppliergoods',
            component: SupplierGoods
        }]
    }]
})