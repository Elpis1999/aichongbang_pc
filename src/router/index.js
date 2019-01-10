import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import StoreApplication from "../store_manage/store_application/index.vue";
import Supgoods from "../suppilergoods/index"
import StoreGoods from "../store_manage/goods_manage/index.vue"
// import SupplierGoods from "../store_manage/supplier_goods/index.vue"
import Petmaster from "../platform/Petmaster/index.vue"
import Login from "../platform/Login/index.vue"
import Register from "../platform/Register/index.vue"
import Pt_count from "../platform/pt_count/index.vue"
import Try from "../try/index.vue";

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
        }, 
        {
            path: '/manage/pt_count',
            component: Pt_count
        },
        // {
        //     path: '/manage/suppliergoods',
        //     component: SupplierGoods
        // },
        {
            path: '/manage/petmaster',
            component: Petmaster
        }]
    },{
        path: '/',
        component: Login
    },{
        path: '/register',
        component: Register
    },
    {
        path: '/look',
        component: Try
    }
]
})