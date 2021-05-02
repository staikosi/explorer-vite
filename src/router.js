import VueRouter from 'vue-router';
import Snapshot from './views/snapshot';
import Account from './views/account';

import Token from './views/token';
import TokenDetail from './views/token/detail';

import Sbp from './views/sbp';

const routes = [
  {
    path: '/sbps',
    component: Sbp
  },
  {
    path: '/tokens/:tid',
    component: TokenDetail
  },
  {
    path: '/tokens',
    component: Token
  },
  {
    path: '/accounts',
    component: Account
  },
  {
    path: '/',
    component: Snapshot
  }
];

export default new VueRouter({
  routes,
  linkActiveClass: 'uk-active'
});
