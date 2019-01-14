import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import StoreApplication from "../store_manage/store_application/index.vue";
import StoreGoods from "../suppilergoods/index"
// import StoreGoods from "../store_manage/goods_manage/index.vue"
import Petmaster from "../platform/Petmaster/index.vue"
import Pt_count from "../platform/Pt_count/index.vue"

import Login from "../platform/Login/index.vue"
import Register from "../platform/Register/index.vue"
import UsersManage from "../platform/UsersManage/index.vue"
import StoresManage from "../platform/StoresManage/index.vue"

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
            path: '/manage/petmaster',
            component: Petmaster
        },
        {
            path: '/manage/pt_count',
            component: Pt_count
        },
        {
            path: '/manage/UsersManage',
            component: UsersManage
        }, {
            path: '/manage/StoresManage',
            component: StoresManage
        }]
    },{
        path: '/login',
        component: Login
    },{
        path: '/register',
        component: Register
    }
]
})