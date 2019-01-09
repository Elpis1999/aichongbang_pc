import Vue from 'vue';
import Router from 'vue-router';
import Manage from "../manage/index.vue";
import StoreApplication from "../store_manage/store_application/index.vue";
import StoreGoods from "../store_manage/goods_manage/index.vue"

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
    ]
=======
        }, {
            path: '/manage/storegoods',
            component: StoreGoods
        }]
>>>>>>> 9c72a69f9de0c06a2f5ba2cae5758c3ec575d4bb
    }]
})