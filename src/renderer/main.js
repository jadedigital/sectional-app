import Vue from 'vue'
import axios from 'axios'
import VueFire from 'vuefire'
import VTooltip from 'v-tooltip'

import App from './App'
import router from './router'
import store from './store'

import 'photon/dist/css/photon.css'
import 'photon/dist/fonts/photon-entypo.eot'
import 'photon/dist/fonts/photon-entypo.svg'
import 'photon/dist/fonts/photon-entypo.ttf'
import 'photon/dist/fonts/photon-entypo.woff'
import 'font-awesome/css/font-awesome.min.css'
import 'font-awesome/fonts/fontawesome-webfont.woff2'
import 'font-awesome/fonts/fontawesome-webfont.woff'
import 'font-awesome/fonts/fontawesome-webfont.ttf'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(VTooltip)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
