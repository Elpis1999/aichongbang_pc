
import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import UsersManage from "../platform/UsersManage/index.vue"
import StoreApplication from "../store_manage/store_application/index.vue";
// import Supgoods from "../suppilergoods/index"
import StoreGoods from "../store_manage/goods_manage/index.vue"
// import SupplierGoods from "../store_manage/supplier_goods/index.vue"
import Petmaster from "../platform/Petmaster/index.vue"
import Login from "../platform/Login/index.vue"
import StoresManage from "../platform/StoresManage/index.vue"
import SuppilerGoods from "../store_manage/suppiler_goods/index.vue"
import SupplierManage from "../platform/SupplierManage/index.vue"
import Register from "../platform/Register"
import Suppiler from "../suppiler/index.vue";
import Service from "../store_manage/service/index.vue";
import Order from "../store_manage/order/index.vue";
import StoreStatistics from "../store_manage/store_statistics/index.vue"
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
            path: '/manage/storegoods',
            component: StoreGoods
        }, {
            path: '/manage/UsersManage',
            component: UsersManage
        }, {
            path: '/manage/petmaster',
            component: Petmaster
        }
        , {
            path: '/manage/StoresManage',
            component: StoresManage
        }
        , {
            path: '/manage/SupplierManage',
            component: SupplierManage
        }
    ]
    }, {
        path: '/',
        component: Login
    }, {
        path: '/register',
        component: Register
    }
        , {
        path: '/manage/petmaster',
        component: Petmaster
    }]
})