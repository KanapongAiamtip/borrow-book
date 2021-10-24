// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import VueResource from 'vue-resource'
import VueCkeditor from 'vue-ckeditor2'
import BackHeader from '@/components/Header.vue'
import FrontHeader from '@/components/FrontHeader.vue'
import Header from '@/components/Header.vue'
import SortedTablePlugin from "vue-sorted-table"

Vue.component('main-header', Header)
Vue.component('back-header', BackHeader)
Vue.component('front-header', FrontHeader)
Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueCkeditor)

Vue.use(SortedTablePlugin)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
