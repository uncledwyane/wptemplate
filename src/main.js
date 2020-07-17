// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import drag from '../static/js/drag.js'

import 'ant-design-vue/dist/antd.css';

//自定义drag指令
Vue.directive('drag',drag)
Vue.use(Antd)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
