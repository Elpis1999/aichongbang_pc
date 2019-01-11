import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import StoreApplication from "../store_manage/store_application/index.vue";
import Supgoods from "../suppilergoods/index"
import StoreGoods from "../store_manage/goods_manage/index.vue"
import SuppilerGoods from "../store_manage/suppiler_goods/index.vue"
import Login from "../platform/Login"
import Register from "../platform/Register"
import Suppiler from "../suppiler/index.vue";
import Service from "../store_manage/service/index.vue";
import Order from "../store_manage/order/index.vue";
import StoreStatistics from "../store_manage/store_statistics/index.vue"
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: "/",
            component: Login
        }, {
            path: "/register",
            component: Register
        },
        {
            path: "/login",
            component: Login
        },
        {
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
})