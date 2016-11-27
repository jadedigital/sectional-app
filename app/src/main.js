import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import VueFire from 'vuefire'

import App from './App'
import routes from './routes'

import 'photon/dist/css/photon.css'
import 'photon/dist/fonts/photon-entypo.eot'
import 'photon/dist/fonts/photon-entypo.svg'
import 'photon/dist/fonts/photon-entypo.ttf'
import 'photon/dist/fonts/photon-entypo.woff'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.use(VueFire)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
