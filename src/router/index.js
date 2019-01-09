import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import StoreApplication from "../store_manage/store_application/index.vue";
<<<<<<< HEAD
import StoreGoods from "../store_manage/goods_manage/index.vue"
import SupplierGoods from "../store_manage/supplier_goods/index.vue"

=======
import Suppiler from"../suppiler/index.vue";
>>>>>>> 基本渲染和传图但是没有传id
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/manage',
        component: Manage,
        children: [{
            path: '/manage/storeapplication',
            component: StoreApplication
<<<<<<< HEAD
        }
   , {
            path: '/manage/storegoods',
            component: StoreGoods
        }, {
            path: '/manage/suppliergoods',
            component: SupplierGoods
        }]
=======
        },
        {
            path: '/manage/suppiler',
            component: Suppiler
        }
    ]
>>>>>>> 基本渲染和传图但是没有传id
    }]
})