import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import VueVideoPlayer from 'vue-video-player'

// require videojs style
import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

import Antd from 'ant-design-vue';
Vue.use(Antd);
import 'ant-design-vue/dist/antd.css';



var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo)

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})



import VueMeta from 'vue-meta'
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
