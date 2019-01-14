import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import StoreApplication from "../store_manage/store_application/index.vue";
import Supgoods from "../suppilergoods/index"
import StoreGoods from "../store_manage/goods_manage/index.vue"
<<<<<<< HEAD
// import SupplierGoods from "../store_manage/supplier_goods/index.vue"
import Petmaster from "../platform/Petmaster/index.vue"
import Login from "../platform/Login/index.vue"
import Register from "../platform/Register/index.vue"
import Pt_count from "../platform/pt_count/index.vue"
import Try from "../try/index.vue";

=======
import SuppilerGoods from "../store_manage/suppiler_goods/index.vue"
import Login from "../platform/Login"
import Register from "../platform/Register"
import Suppiler from "../suppiler/index.vue";
import Service from "../store_manage/service/index.vue";
import Order from "../store_manage/order/index.vue";
import StoreStatistics from "../store_manage/store_statistics/index.vue"
>>>>>>> 53d991e43e1f4a1d58f0d8aadb2f31a38089c9be
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
<<<<<<< HEAD
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
=======
            path: '/manage',
            component: Manage,
            children: [{
                    path: '/manage/storeapplication',
                    component: StoreApplication

                }, {
                    path: '/manage/supgoods',
                    component: Supgoods
                },
                {
                    path: '/manage/storegoods',
                    component: StoreGoods
                }, {
                    path: '/manage/suppilergoods',
                    component: SuppilerGoods
                },
                {
                    path: '/manage/suppiler',
                    component: Suppiler
                },
                {
                  path: "/manage/service",
                  component: Service
                },
                {
                  path: "/manage/order",
                  component: Order
                }, {
                    path: '/manage/storestatistics',
                    component: StoreStatistics
                }
            ]

        }
    ]
>>>>>>> 53d991e43e1f4a1d58f0d8aadb2f31a38089c9be
})