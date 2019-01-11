import Vue from 'vue'
import App from './App.vue'
import store from "./store/index.js"
import router from './router/index'
import Login from './platform/Login/index'
import Petmaster from './platform/Petmaster/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import UsersManage from "./platform/UsersManage/index"
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
