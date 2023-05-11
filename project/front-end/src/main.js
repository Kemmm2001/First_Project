import Vue from 'vue'
import App from './App.vue'
import router from './router'

import moment from 'moment';
import VueMoment from 'vue-moment';



//Theme UX/UI
import  './assets/css/core.css'; 
import  './assets/css/core-dark.css'; 
import  './assets/css/bootstrap.min.css'; 
import  './assets/css/theme-default-dark.css'; 
import  './assets/css/theme-default.css'; 

//Icon
import './assets/css/fonts/flag-icons.css'
import './assets/css/fonts/fontawesome.css'
import './assets/css/fonts/tabler-icons.css'

Vue.config.productionTip = false
Vue.use(VueMoment, { moment });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
