import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from '@/router'
import 'u-reset.css'
import axios from 'axios';
import filter from '@/filter';

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$http = axios;

Object.keys(filter).forEach(ele=>{
    Vue.filter(ele, filter[ele]);
})

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
