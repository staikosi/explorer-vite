
import './index.less';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import ClipboardJS from 'clipboard';

import Vue from 'vue';
import VueRouter from 'vue-router';

import router from './router';
import store from './store';

import App from './App.vue';

UIkit.use(Icons);
new ClipboardJS('.js-clipboard');

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
