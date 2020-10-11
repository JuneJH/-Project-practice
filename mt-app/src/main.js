import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'
Vue.config.productionTip = false

Vue.use(ElementUI);
// 自定义指令
Vue.directive('document-click', {
  bind(el,binding,vnode){
    document.addEventListener('click',binding.value)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

