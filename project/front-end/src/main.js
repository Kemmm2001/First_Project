import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  './assets/css/core.css'; 
import  './assets/css/core-dark.css'; 
import  './assets/css/bootstrap.min.css'; 
import  './assets/css/theme-default-dark.css'; 
import  './assets/css/theme-default.css'; 

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
