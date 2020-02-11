import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGoogleCharts from 'vue-google-charts'
import VuePapaParse from 'vue-papa-parse'

Vue.use(VuePapaParse)
Vue.use(VueGoogleCharts)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
