
import 'uikit/src/less/uikit.theme.less';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router';
import store from './store';

import App from './App.vue';

import './index.less';

UIkit.use(Icons);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  store.dispatch('getHeight');
  next();
});

Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
